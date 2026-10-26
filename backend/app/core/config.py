import os
from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "ANRCAS College API"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # Database
    DATABASE_URL: str = "sqlite:///./anr_dev.db"

    @property
    def sync_database_url(self) -> str:
        # Standardize cloud postgres:// schema to SQLAlchemy postgresql://
        url = self.DATABASE_URL
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql://", 1)

        if url.startswith("sqlite:///./"):
            backend_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
            db_name = url.replace("sqlite:///./", "")
            abs_db_path = os.path.join(backend_dir, db_name).replace("\\", "/")
            return f"sqlite:///{abs_db_path}"
        return url

    # Security & Sessions
    SECRET_KEY: str = "development_secret_key_change_in_production_anrcas_2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480
    COOKIE_SAMESITE: str = "lax"  # "lax" for same-domain/subdomains, "none" for cross-domain
    COOKIE_SECURE: bool = True     # Enforce HTTPS cookie in production

    # CORS
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174"

    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]

    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    AUTH_RATE_LIMIT_PER_MINUTE: int = 10

    # Uploads
    UPLOAD_DIR: str = "./uploads"
    MAX_UPLOAD_SIZE_MB: int = 5
    ALLOWED_IMAGE_EXTENSIONS: str = "jpg,jpeg,png,webp"

    @property
    def abs_upload_dir(self) -> str:
        if os.path.isabs(self.UPLOAD_DIR):
            return self.UPLOAD_DIR
        backend_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        return os.path.join(backend_dir, self.UPLOAD_DIR).replace("\\", "/")

    @property
    def allowed_extensions(self) -> List[str]:
        return [ext.strip().lower() for ext in self.ALLOWED_IMAGE_EXTENSIONS.split(",") if ext.strip()]

    @field_validator("ENVIRONMENT")
    @classmethod
    def validate_environment(cls, v: str) -> str:
        val = v.lower().strip()
        if val not in ("development", "staging", "production", "test"):
            raise ValueError(f"Invalid environment: {v}. Must be development, staging, production, or test.")
        return val

    def validate_production_safeguards(self) -> None:
        """Ensure critical security configurations in production."""
        if self.ENVIRONMENT == "production":
            if self.DEBUG:
                raise ValueError("DEBUG must be set to False in production environment.")
            if not self.SECRET_KEY or "development_secret_key" in self.SECRET_KEY or len(self.SECRET_KEY) < 32:
                raise ValueError(
                    "Insecure SECRET_KEY detected in production! "
                    "You must provide a high-entropy secret key of at least 32 characters in .env."
                )
            if self.DATABASE_URL.startswith("sqlite"):
                raise ValueError(
                    "SQLite cannot be used as the production database. "
                    "Please configure a valid PostgreSQL DATABASE_URL in .env."
                )
            if not any(self.DATABASE_URL.startswith(p) for p in ("postgresql://", "postgresql+psycopg2://", "postgresql+asyncpg://", "postgres://")):
                raise ValueError(
                    "Production requires a valid PostgreSQL DATABASE_URL (e.g. postgresql://user:pass@host:5432/dbname)."
                )
            if "*" in self.cors_origins:
                raise ValueError(
                    "Wildcard '*' is not permitted in ALLOWED_ORIGINS in production environment."
                )
            if not self.cors_origins:
                raise ValueError(
                    "At least one production domain must be configured in ALLOWED_ORIGINS."
                )

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()
settings.validate_production_safeguards()
