from datetime import datetime, timezone

from email_validator import EmailNotValidError, validate_email
from sqlalchemy import select
from werkzeug.security import check_password_hash, generate_password_hash

from app.config.extensions import db
from app.models import User


MIN_USERNAME_LENGTH = 3
MIN_PASSWORD_LENGTH = 8
INVALID_CREDENTIALS_MESSAGE = "Invalid email or password."


def get_user_by_id(user_id):
    try:
        normalized_user_id = int(user_id)
    except (TypeError, ValueError):
        return None

    statement = select(User).where(
        User.id == normalized_user_id,
        User.is_active.is_(True),
        User.deleted_at.is_(None),
    )
    return db.session.execute(statement).scalar_one_or_none()


def get_user_by_email(email):
    normalized_email = normalize_email(email)
    statement = select(User).where(User.email == normalized_email)
    return db.session.execute(statement).scalar_one_or_none()


def get_user_by_username(username):
    normalized_username = normalize_username(username)
    statement = select(User).where(User.username == normalized_username)
    return db.session.execute(statement).scalar_one_or_none()


def validate_registration_data(data):
    data = data or {}
    username = normalize_username(data.get("username"))
    email = validate_and_normalize_email(data.get("email"))
    password = data.get("password")

    validate_username(username)
    validate_password(password)

    return {
        "username": username,
        "email": email,
        "password": password,
    }


def register_user(data):
    cleaned_data = validate_registration_data(data)

    if get_user_by_email(cleaned_data["email"]) is not None:
        raise ValueError("Unable to create account with the provided credentials.")

    if get_user_by_username(cleaned_data["username"]) is not None:
        raise ValueError("Username is already registered.")

    user = User(
        username=cleaned_data["username"],
        email=cleaned_data["email"],
        password_hash=hash_password(cleaned_data["password"]),
        is_active=True,
        deleted_at=None,
    )
    db.session.add(user)
    db.session.commit()

    return user


def validate_login_data(data):
    data = data or {}
    email = validate_and_normalize_email(data.get("email"))
    password = data.get("password")

    if not is_non_empty_string(password):
        raise ValueError("Password is required.")

    return {
        "email": email,
        "password": password,
    }


def login_user(data):
    try:
        cleaned_data = validate_login_data(data)
    except ValueError as error:
        if str(error) in {"Email is required.", "Password is required."}:
            raise

        raise ValueError(INVALID_CREDENTIALS_MESSAGE) from error

    user = get_user_by_email(cleaned_data["email"])

    if user is None or not is_active_user(user):
        raise ValueError(INVALID_CREDENTIALS_MESSAGE)

    if not verify_password(user.password_hash, cleaned_data["password"]):
        raise ValueError(INVALID_CREDENTIALS_MESSAGE)

    return user


def hash_password(password):
    return generate_password_hash(password)


def verify_password(password_hash, password):
    return check_password_hash(password_hash, password)


def update_user_profile(user_id, data):
    user = get_user_by_id(user_id)
    if user is None:
        raise ValueError("User not found.")

    data = data or {}
    cleaned_updates = {}

    if "username" in data:
        username = normalize_username(data.get("username"))
        validate_username(username)
        cleaned_updates["username"] = username

    if "email" in data:
        cleaned_updates["email"] = validate_and_normalize_email(data.get("email"))

    if "email" in cleaned_updates and cleaned_updates["email"] != user.email:
        existing_user = get_user_by_email(cleaned_updates["email"])
        if existing_user is not None and existing_user.id != user.id:
            raise ValueError("Unable to create account with the provided credentials.")

    if "username" in cleaned_updates and cleaned_updates["username"] != user.username:
        existing_user = get_user_by_username(cleaned_updates["username"])
        if existing_user is not None and existing_user.id != user.id:
            raise ValueError("Username is already registered.")

    for field_name, field_value in cleaned_updates.items():
        setattr(user, field_name, field_value)

    db.session.commit()
    return user


def change_user_password(user_id, data):
    user = get_user_by_id(user_id)
    if user is None:
        raise ValueError("User not found.")

    data = data or {}
    current_password = data.get("current_password")
    new_password = data.get("new_password")

    if not is_non_empty_string(current_password):
        raise ValueError("Current password is required.")

    validate_password(new_password, field_name="New password")

    if not verify_password(user.password_hash, current_password):
        raise ValueError("Current password is incorrect.")

    user.password_hash = hash_password(new_password)
    db.session.commit()

    return {"success": True}


def soft_delete_user(user_id):
    user = get_user_by_id(user_id)
    if user is None:
        raise ValueError("User not found.")

    user.is_active = False
    user.deleted_at = datetime.now(timezone.utc)
    db.session.commit()

    return {"success": True}


def serialize_user(user):
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "created_at": serialize_datetime(user.created_at),
        "is_active": user.is_active,
    }


def validate_and_normalize_email(email):
    if not is_non_empty_string(email):
        raise ValueError("Email is required.")

    try:
        validation_result = validate_email(email.strip(), check_deliverability=False)
    except EmailNotValidError as error:
        raise ValueError("Email is invalid.") from error

    return validation_result.normalized.lower()


def normalize_email(email):
    if email is None:
        return ""

    return str(email).strip().lower()


def normalize_username(username):
    if username is None:
        return ""

    return str(username).strip()


def validate_username(username):
    if not is_non_empty_string(username):
        raise ValueError("Username is required.")

    if len(username) < MIN_USERNAME_LENGTH:
        raise ValueError(
            f"Username must be at least {MIN_USERNAME_LENGTH} characters long."
        )


def validate_password(password, field_name="Password"):
    if not is_non_empty_string(password):
        raise ValueError(f"{field_name} is required.")

    if len(password) < MIN_PASSWORD_LENGTH:
        raise ValueError(
            f"{field_name} must be at least {MIN_PASSWORD_LENGTH} characters long."
        )


def is_active_user(user):
    return user.is_active and user.deleted_at is None


def is_non_empty_string(value):
    return isinstance(value, str) and bool(value.strip())


def serialize_datetime(value):
    if value is None:
        return None

    return value.isoformat()
