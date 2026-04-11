from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import sys
sys.path.insert(1, '../')
from db import get_db_connection

registration_bp = Blueprint("registrations", __name__)

@registration_bp.route("/<int:event_id>", methods=["POST"])
@jwt_required()
def register_for_event(event_id):
    current_user = get_jwt_identity()
    user_id = current_user["user_id"]

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("""
            INSERT INTO registrations (user_id, event_id)
            VALUES (%s, %s)
            RETURNING *
        """, (user_id, event_id))
        registration = cur.fetchone()
        conn.commit()
        return jsonify({"message": "Registered successfully", "registration": registration}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 400
    finally:
        cur.close()
        conn.close()

@registration_bp.route("/my-events", methods=["GET"])
@jwt_required()
def get_my_registrations():
    current_user = get_jwt_identity()
    user_id = current_user["user_id"]

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT r.registration_id, e.event_id, e.title, e.event_date, e.event_time
        FROM registrations r
        JOIN events e ON r.event_id = e.event_id
        WHERE r.user_id = %s
        ORDER BY e.event_date, e.event_time
    """, (user_id,))
    registrations = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(registrations), 200