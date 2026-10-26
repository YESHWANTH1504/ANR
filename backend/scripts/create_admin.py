#!/usr/bin/env python3
"""Secure script to create an initial or additional administrator.
Usage:
    python scripts/create_admin.py --email admin@anrcas.edu.in --name "Principal Administrator"
"""
import sys
import os
import argparse
import getpass

# Add backend directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.db.session import SessionLocal
from app.models.admin import Administrator
from app.core.security import get_password_hash


def create_admin(name: str, email: str, password: str, role: str = "superadmin"):
    db = SessionLocal()
    try:
        clean_email = email.strip().lower()
        existing = db.query(Administrator).filter(Administrator.email == clean_email).first()
        if existing:
            print(f"Error: Administrator with email '{clean_email}' already exists.")
            sys.exit(1)

        if len(password) < 8:
            print("Error: Password must be at least 8 characters long.")
            sys.exit(1)

        password_hash = get_password_hash(password)
        admin = Administrator(
            name=name.strip(),
            email=clean_email,
            password_hash=password_hash,
            role=role,
            is_active=True,
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
        print(f"Success: Administrator '{admin.name}' ({admin.email}) created with role '{admin.role}'.")
    finally:
        db.close()


def main():
    parser = argparse.ArgumentParser(description="Create a secure administrator for ANRCAS")
    parser.add_argument("--name", help="Administrator Full Name")
    parser.add_argument("--email", help="Administrator Email Address")
    parser.add_argument("--password", help="Administrator Password (optional, will prompt securely if omitted)")
    parser.add_argument("--role", default="superadmin", help="Role (superadmin / admin)")

    args = parser.parse_args()

    name = args.name or input("Enter Administrator Name: ").strip()
    email = args.email or input("Enter Administrator Email: ").strip()
    password = os.getenv("ADMIN_PASSWORD") or args.password
    if not password:
        password = getpass.getpass("Enter Administrator Password (min 8 chars): ")
        password_confirm = getpass.getpass("Confirm Password: ")
        if password != password_confirm:
            print("Error: Passwords do not match.")
            sys.exit(1)

    create_admin(name=name, email=email, password=password, role=args.role)


if __name__ == "__main__":
    main()
