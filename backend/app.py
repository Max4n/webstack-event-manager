from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from routes.auth_routes import auth_bp
from routes.event_routes import event_bp
from routes.registration_routes import registration_bp

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET_KEY

CORS(app)
JWTManager(app)

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(event_bp, url_prefix="/events")
app.register_blueprint(registration_bp, url_prefix="/registrations")

@app.route("/")
def home():
    return {"message": "Event Manager API is running"}

if __name__ == "__main__":
    app.run(debug=True)