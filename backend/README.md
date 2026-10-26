# A.N. Radhakrishnan College of Arts & Science (ANRCAS) — Backend API & Database

FastAPI-powered REST API and relational PostgreSQL/SQLite persistence engine for the ANRCAS institutional portal.

---

## 1. Technology Stack

- **Runtime**: Python 3.12+ (tested on Python 3.13 / 3.14)
- **API Framework**: FastAPI 0.115+
- **ORM & Database Toolkit**: SQLAlchemy 2.0+
- **Database Migrations**: Alembic 1.14+
- **Data Validation**: Pydantic v2 & Pydantic-Settings
- **Security & Cryptography**: Bcrypt (password hashing) & PyJWT (HMAC-SHA256 tokens)
- **Production Database**: PostgreSQL (with SQLite zero-dependency local development mode)
- **Test Suite**: Pytest & HTTPX TestClient

---

## 2. Directory Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── deps.py               # Authentication & DB session dependencies
│   │   └── v1/
│   │       ├── api.py            # API v1 centralized router
│   │       └── endpoints/        # Auth, Programmes, Depts, News, Gallery, Enquiries, Contact, Settings
│   ├── core/
│   │   ├── config.py             # BaseSettings from .env
│   │   ├── security.py           # Bcrypt & JWT token management
│   │   └── rate_limit.py         # IP rate limiting
│   ├── db/
│   │   ├── base.py               # DeclarativeBase
│   │   └── session.py            # Engine & SessionLocal
│   ├── models/                   # SQLAlchemy 2.0 ORM models
│   ├── schemas/                  # Pydantic v2 schemas
│   └── main.py                   # FastAPI application & middlewares
├── alembic/                      # Database migration environment
├── scripts/
│   ├── create_admin.py           # Secure CLI administrator bootstrap
│   └── seed_from_frontend.py     # Verified institutional data seed
├── tests/                        # Pytest automated test suite
├── .env.example                  # Documented environment variables
├── requirements.txt
└── Dockerfile
```

---

## 3. Quickstart & Local Development

### A. Environment Setup
```bash
# In backend/ directory:
python -m venv venv

# Windows activate:
.\venv\Scripts\activate

# Install dependencies:
pip install -r requirements.txt
```

### B. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Key environment parameters:
- `DATABASE_URL`: `postgresql://user:password@localhost:5432/anrcas_db` (or `sqlite:///./anr_dev.db` for local dev)
- `SECRET_KEY`: Secure 32+ character hexadecimal string
- `ALLOWED_ORIGINS`: Comma-separated frontend origins (e.g. `http://localhost:5173`)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Session duration (default 480 minutes / 8 hours)

### C. Database Migration
```bash
alembic upgrade head
```

### D. Seed Verified College Data
Populates authentic academic departments, degree programmes, events, gallery items, and contact coordinates:
```bash
python scripts/seed_from_frontend.py
```

### E. Bootstrap Initial Administrator
Create an administrator securely without hardcoded credentials:
```bash
python scripts/create_admin.py --name "Institutional Administrator" --email "admin@anrcas.edu.in"
# You will be prompted securely for a password (minimum 8 characters)
```

### F. Run Development Server
```bash
uvicorn app.main:app --reload --port 8000
```
- Interactive OpenAPI Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
- Alternative ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)
- Health Check: [http://localhost:8000/health](http://localhost:8000/health)

---

## 4. Running Automated Tests

Run the complete test suite with isolated in-memory test database transactions:
```bash
pytest tests -v
```
Tests cover:
- Health check endpoints
- Schema validation & parameter constraints
- Public content retrieval & category filtering
- Online admissions enquiries & rate-limiting
- Contact messages submission & verification
- Administrator authentication, password hashing, and token invalidation
- Unauthorized access rejection (HTTP 401)
- Full Admin CRUD operations for programmes, departments, news, and gallery
- Admissions enquiry and message status triage and internal notes logging
- Draft vs published content visibility
- Magic byte image signature validation (preventing executable uploads)
- Form duplicate submission prevention and phone formatting validation
- Production safeguards checking insecure secret keys and databases

---

## 5. PostgreSQL Production Deployment & Operations

### A. Required Production Environment Variables

All production environment variables should be defined in your production container/server environment without committing secrets:

| Variable | Description | Example / Recommendation |
| :--- | :--- | :--- |
| `ENVIRONMENT` | Runtime mode | `production` (enforces strict startup safeguards) |
| `DEBUG` | FastAPI debug mode | `False` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://anr_user:<STRONG_PASSWORD>@db.internal:5432/anrcas_prod` |
| `SECRET_KEY` | 32+ character high-entropy key | Generate with `openssl rand -hex 32` |
| `ALLOWED_ORIGINS` | Permitted frontend origins | `https://anrcas.edu.in,https://www.anrcas.edu.in` |
| `ACCESS_TOKEN_EXPIRE_MINUTES`| Admin session expiry | `480` (8 hours) |
| `UPLOAD_DIR` | Absolute or relative upload directory | `/app/uploads` |
| `RATE_LIMIT_PER_MINUTE` | Public endpoints rate limit | `60` |
| `AUTH_RATE_LIMIT_PER_MINUTE` | Auth login rate limit | `10` |

### B. Production PostgreSQL Setup
1. Provision a PostgreSQL 15+ database instance.
2. Set `DATABASE_URL` and `ENVIRONMENT=production`.
3. Run migrations on release:
   ```bash
   alembic upgrade head
   ```

### C. Persistent Storage for Media Uploads
In production container environments (Docker / Kubernetes):
- Declare a persistent volume mapped to `/app/uploads` to ensure media uploaded by administrators survives container updates:
  ```bash
  docker run -d \
    --name anrcas_backend \
    -p 8000:8000 \
    --env-file .env.production \
    -v anrcas_media_uploads:/app/uploads \
    anrcas-backend:latest
  ```

### D. Production Nginx & SPA Direct Refresh Configuration
To serve the built React frontend (`dist/`) while proxying `/api/v1` and `/uploads` to FastAPI with HTTPS and SPA route rewrites:

```nginx
server {
    listen 80;
    server_name anrcas.edu.in www.anrcas.edu.in;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name anrcas.edu.in www.anrcas.edu.in;

    ssl_certificate /etc/letsencrypt/live/anrcas.edu.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/anrcas.edu.in/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Frontend SPA Root (Direct browser refresh support for /admin, /admissions, etc.)
    root /var/www/anrcas/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API Reverse Proxy
    location /api/ {
        proxy_pass http://127.0.0.1:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Uploads Static Media
    location /uploads/ {
        proxy_pass http://127.0.0.1:8000/uploads/;
        proxy_set_header Host $host;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Health Check
    location /health {
        proxy_pass http://127.0.0.1:8000/health;
    }
}
```

### E. Database Backup & Restore Procedures

**PostgreSQL Automated Dump**:
```bash
pg_dump -U postgres -h <host> -d anrcas_prod -F c -b -v -f "/backups/anrcas_backup_$(date +%Y%m%d_%H%M%S).dump"
```

**PostgreSQL Restoration**:
```bash
pg_restore -U postgres -h <host> -d anrcas_prod --clean --if-exists -v "/backups/anrcas_backup_TIMESTAMP.dump"
```

**Local SQLite Backup**:
```bash
sqlite3 anr_dev.db ".backup 'anr_dev_backup_$(date +%Y%m%d).db'"
```
