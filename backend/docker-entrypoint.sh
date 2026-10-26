#!/bin/sh
set -e

echo "[ANRCAS Deployment] Checking database and running Alembic migrations..."
alembic upgrade head
echo "[ANRCAS Deployment] Database migrations applied successfully."

echo "[ANRCAS Deployment] Starting FastAPI application server..."
exec "$@"
