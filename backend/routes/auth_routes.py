from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from models.db import get_db_connection

auth_bp = Blueprint("auth", __name__)
bcrypt = Bcrypt()

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    full_name = data.get("full_name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "client")

    if not full_name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute(
            """
            INSERT INTO users (full_name, email, password_hash, role)
            VALUES (%s, %s, %s, %s)
            RETURNING user_id, full_name, email, role
            """,
            (full_name, email, hashed_password, role)
        )
        user = cur.fetchone()
        conn.commit()
        return jsonify({"message": "User registered successfully", "user": user}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 400
    finally:
        cur.close()
        conn.close()

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cur.fetchone()

    cur.close()
    conn.close()

    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    if not bcrypt.check_password_hash(user["password_hash"], password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity={
        "user_id": user["user_id"],
        "email": user["email"],
        "role": user["role"]
    })

    return jsonify({
        "message": "Login successful",
        "token": access_token,
        "user": {
            "user_id": user["user_id"],
            "full_name": user["full_name"],
            "email": user["email"],
            "role": user["role"]
        }
    }), 200