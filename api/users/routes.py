from flask import Blueprint, request, session, jsonify
from flask_session import Session
from pymongo import MongoClient
import uuid
import bcrypt
from flask_session import Session
from functools import wraps

from config import config

from app import app

server_session = Session(app)
db_users = MongoClient(config.MONGO_DB_LOCAL).review_sense.users
db_users.drop()


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
            user = db_users.find_one({"_id": {"$eq": user_id}})
            print(user["role"])
            print(role_names)
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
    user = db_users.find_one({"_id": {"$eq": user_id}})
    return jsonify({"user": user["email"]})


@app.post("/api/user/register")
def register_user():
    email = request.json["email"]
    password = request.json["password"]
    role = request.json["role"]

    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    user = db_users.find_one({"email": {"$eq": email}})
    if user is not None:
        return jsonify({"error": "User already exists"}), 409

    new_user = {
        "_id": uuid.uuid4().hex,
        "email": email,
        "password": hashed_password,
        "posts": [],
        "comments": [],
        "role": role,
    }
    db_users.insert_one(new_user)

    return jsonify({"id": new_user["_id"], "email": new_user["email"]}), 200


@app.post("/api/user/login")
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = db_users.find_one({"email": {"$eq": email}})
    if user is None:
        return jsonify({"error": "Unathorized"}), 401

    if not bcrypt.checkpw(password.encode(), user["password"]):
        return jsonify({"error": "Unathorized"}), 401

    session["user_id"] = user["_id"]

    return jsonify({"id": user["_id"], "email": user["email"]}), 200


@app.get("/api/user/logout")
def logout_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unathorized"}), 401
    session.pop("user_id")
    return jsonify({"success": True}), 200
