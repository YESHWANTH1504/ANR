#!/usr/bin/env python3
"""Secure utility to reset an administrator's password.
Usage:
    python scripts/reset_admin_password.py --email admin@anrcas.edu.in
Passes password securely via getpass (prompted) or ADMIN_PASSWORD env var.
Never hardcodes passwords in source code.
"""
import sys
import os
import argparse
import getpass

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.db.session import SessionLocal
from app.models.admin import Administrator
from app.core.security import get_password_hash


def reset_password(email: str, new_pass: str):
    clean_email = email.strip().lower()
    if len(new_pass) < 8:
        print("Error: Password must be at least 8 characters long.")
        sys.exit(1)

    db = SessionLocal()
    try:
        admin = db.query(Administrator).filter(Administrator.email == clean_email).first()
        if not admin:
            print(f"Error: Administrator with email '{clean_email}' not found.")
            sys.exit(1)

        admin.password_hash = get_password_hash(new_pass)
        admin.is_active = True
        db.commit()
        print(f"Success: Password reset successfully for {clean_email}")
    except Exception as e:
        db.rollback()
        print(f"Error resetting password: {e}")
        sys.exit(1)
    finally:
        db.close()


def main():
    parser = argparse.ArgumentParser(description="Reset administrator password securely.")
    parser.add_argument("--email", required=False, help="Administrator email address")
    args = parser.parse_args()

    email = args.email or input("Enter Administrator Email: ").strip()
    if not email:
        print("Error: Email is required.")
        sys.exit(1)

    # Allow headless bootstrap via environment variable or secure interactive prompt
    new_password = os.getenv("ADMIN_PASSWORD")
    if not new_password:
        new_password = getpass.getpass("Enter New Password (min 8 characters): ")
        confirm_password = getpass.getpass("Confirm New Password: ")
        if new_password != confirm_password:
            print("Error: Passwords do not match.")
            sys.exit(1)

    reset_password(email, new_password)


if __name__ == "__main__":
    main()
