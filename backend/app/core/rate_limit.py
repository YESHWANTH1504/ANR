import time
from collections import defaultdict
from typing import Dict, List
from fastapi import HTTPException, Request, status
from app.core.config import settings


class InMemoryRateLimiter:
    def __init__(self, requests_per_minute: int = 60):
        self.requests_per_minute = requests_per_minute
        self.window = 60.0  # seconds
        self.history: Dict[str, List[float]] = defaultdict(list)
        self._last_cleanup = time.time()

    def is_allowed(self, client_ip: str) -> bool:
        now = time.time()
        # Clean up records older than window for this IP
        self.history[client_ip] = [
            t for t in self.history[client_ip] if now - t < self.window
        ]
        
        # Periodic full memory cleanup every 5 minutes to prevent unbounded memory growth
        if now - self._last_cleanup > 300.0:
            stale_ips = [ip for ip, timestamps in self.history.items() if not timestamps or (now - timestamps[-1] >= self.window)]
            for ip in stale_ips:
                self.history.pop(ip, None)
            self._last_cleanup = now

        if len(self.history[client_ip]) >= self.requests_per_minute:
            return False
        self.history[client_ip].append(now)
        return True


public_rate_limiter = InMemoryRateLimiter(requests_per_minute=settings.RATE_LIMIT_PER_MINUTE)
auth_rate_limiter = InMemoryRateLimiter(requests_per_minute=settings.AUTH_RATE_LIMIT_PER_MINUTE)


def get_client_ip(request: Request) -> str:
    """Extract client IP taking into account reverse proxy headers."""
    # Check X-Forwarded-For header (first IP in chain is original client)
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        client_ip = forwarded.split(",")[0].strip()
        if client_ip:
            return client_ip

    # Check X-Real-IP header
    real_ip = request.headers.get("x-real-ip")
    if real_ip and real_ip.strip():
        return real_ip.strip()

    # Fall back to direct socket client host
    if request.client and request.client.host:
        return request.client.host

    return "unknown"


def check_rate_limit(request: Request, limiter: InMemoryRateLimiter = public_rate_limiter):
    """Enforce rate limits per client IP."""
    client_ip = get_client_ip(request)
    if not limiter.is_allowed(client_ip):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests. Please try again later."
        )
