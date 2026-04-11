from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from functools import wraps
from flask import jsonify

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        current_user = get_jwt_identity()

        if current_user["role"] != "admin":
            return jsonify({"error": "Admin access required"}), 403

        return fn(*args, **kwargs)
    return wrapper