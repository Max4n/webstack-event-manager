from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.db import get_db_connection
from utils.auth_middleware import admin_required

event_bp = Blueprint("events", __name__)

@event_bp.route("/", methods=["GET"])
def get_events():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT e.event_id, e.title, e.description, e.event_date, e.event_time,
               c.name AS category, v.venue_name, v.address, v.latitude, v.longitude
        FROM events e
        LEFT JOIN categories c ON e.category_id = c.category_id
        LEFT JOIN venues v ON e.venue_id = v.venue_id
        ORDER BY e.event_date, e.event_time
    """)
    events = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(events), 200

@event_bp.route("/<int:event_id>", methods=["GET"])
def get_event(event_id):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT e.event_id, e.title, e.description, e.event_date, e.event_time,
               c.name AS category, v.venue_name, v.address, v.latitude, v.longitude
        FROM events e
        LEFT JOIN categories c ON e.category_id = c.category_id
        LEFT JOIN venues v ON e.venue_id = v.venue_id
        WHERE e.event_id = %s
    """, (event_id,))
    event = cur.fetchone()

    cur.close()
    conn.close()

    if not event:
        return jsonify({"error": "Event not found"}), 404

    return jsonify(event), 200

@event_bp.route("/", methods=["POST"])
@admin_required
def create_event():
    data = request.get_json()
    current_user = get_jwt_identity()

    title = data.get("title")
    description = data.get("description")
    event_date = data.get("event_date")
    event_time = data.get("event_time")
    category_id = data.get("category_id")
    venue_id = data.get("venue_id")

    if not title or not event_date or not event_time:
        return jsonify({"error": "Title, date, and time are required"}), 400

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO events (title, description, event_date, event_time, category_id, venue_id, created_by)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING *
    """, (title, description, event_date, event_time, category_id, venue_id, current_user["user_id"]))

    new_event = cur.fetchone()
    conn.commit()

    cur.close()
    conn.close()

    return jsonify({"message": "Event created successfully", "event": new_event}), 201

@event_bp.route("/<int:event_id>", methods=["PUT"])
@admin_required
def update_event(event_id):
    data = request.get_json()

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        UPDATE events
        SET title = %s,
            description = %s,
            event_date = %s,
            event_time = %s,
            category_id = %s,
            venue_id = %s
        WHERE event_id = %s
        RETURNING *
    """, (
        data.get("title"),
        data.get("description"),
        data.get("event_date"),
        data.get("event_time"),
        data.get("category_id"),
        data.get("venue_id"),
        event_id
    ))

    updated_event = cur.fetchone()
    conn.commit()

    cur.close()
    conn.close()

    if not updated_event:
        return jsonify({"error": "Event not found"}), 404

    return jsonify({"message": "Event updated successfully", "event": updated_event}), 200

@event_bp.route("/<int:event_id>", methods=["DELETE"])
@admin_required
def delete_event(event_id):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("DELETE FROM events WHERE event_id = %s RETURNING *", (event_id,))
    deleted_event = cur.fetchone()
    conn.commit()

    cur.close()
    conn.close()

    if not deleted_event:
        return jsonify({"error": "Event not found"}), 404

    return jsonify({"message": "Event deleted successfully"}), 200