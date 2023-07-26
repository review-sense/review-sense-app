import uuid
from datetime import datetime
from functools import wraps

import bcrypt
from app import app, server_session
from config import config
from flask import jsonify, request, session


# Decorators
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if "user_id" in session:
            return f(*args, **kwargs)
        else:
            return jsonify({"error": "Unathorized"}), 401

    return wrap


def roles_required(*role_names):
    def decorator(original_route):
        @wraps(original_route)
        def decorated_route(*args, **kwargs):
            if not "user_id" in session:
                return jsonify({"error": "Unathorized"}), 401

            user_id = session.get("user_id")
            user = config.DB_USERS.find_one({"_id": {"$eq": user_id}})
            if not user["role"] in role_names:
                return jsonify({"error": "Unathorized"}), 401
            else:
                return original_route(*args, **kwargs)

        return decorated_route

    return decorator


@app.get("/api/user/@me")
@login_required
@roles_required("business")
def get_current_user():
    user_id = session.get("user_id")
    user = config.DB_USERS.find_one({"_id": {"$eq": user_id}})
    user["posts"] = [
        post for post in config.DB_POSTS.find({"user_id": {"$eq": user_id}})
    ]
    return jsonify({"user": user["email"], "posts": user["posts"]}), 200


@app.post("/api/user/register")
def register_user():
    email = request.json["email"]
    password = request.json["password"]
    role = request.json["role"]

    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    user = config.DB_USERS.find_one({"email": {"$eq": email}})
    if user is not None:
        return jsonify({"error": "User already exists"}), 409

    new_user = {
        "_id": uuid.uuid4().hex,
        "email": email,
        "password": hashed_password,
        "role": role,
        "time_created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }
    config.DB_USERS.insert_one(new_user)

    return jsonify({"id": new_user["_id"], "email": new_user["email"]}), 200


@app.post("/api/user/login")
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = config.DB_USERS.find_one({"email": {"$eq": email}})
    if user is None:
        return jsonify({"error": "Unathorized"}), 401

    if not bcrypt.checkpw(password.encode(), user["password"]):
        return jsonify({"error": "Unathorized"}), 401

    session["user_id"] = user["_id"]

    return jsonify({"id": user["_id"], "email": user["email"]}), 200


@app.post("/api/user/logout")
@login_required
def logout_user():
    session.pop("user_id")
    return jsonify({"success": True}), 200


from posts.routes import *
