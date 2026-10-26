FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application code
COPY . .

# Create non-root user, prepare upload volume, and configure entrypoint
RUN useradd -m -u 1000 appuser && \
    mkdir -p /app/uploads && \
    chmod +x /app/docker-entrypoint.sh && \
    chown -R appuser:appuser /app

# Declare persistent volume for uploads
VOLUME ["/app/uploads"]

# Switch to non-root user
USER appuser

# Expose API port
EXPOSE 8000

# Entrypoint applies migrations automatically on container start
ENTRYPOINT ["/app/docker-entrypoint.sh"]

# Run uvicorn server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
