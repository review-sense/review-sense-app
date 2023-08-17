import os
import uuid
from datetime import datetime
from functools import wraps

import bcrypt
import boto3
from app import app, server_session
from config import config
from flask import jsonify, request, session
from utils.folder import clean_up_folder

UPLOAD_FOLDER = "uploads"
BUCKET = "engagesense-test"


# Decorators
# TODO: think about moving decorators
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


def authentificate(user_id):
    session["user_id"] = user_id


from businesses.routes import *
from posts.routes import *


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

    if role == "business":
        new_user = {
            "_id": uuid.uuid4().hex,
            "email": email,
            "password": hashed_password,
            "role": role,
            "time_created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "name": "",
            "description": "",
            "url": "",
            "category": "",
            "image": "uploads/default-business.png",
            "rating": 0,
            "address": "",
            "hours": "",
        }
    else:
        new_user = {
            "_id": uuid.uuid4().hex,
            "email": email,
            "password": hashed_password,
            "role": role,
            "time_created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "image": "uploads/default-user.png",
        }
    config.DB_USERS.insert_one(new_user)
    authentificate(new_user["_id"])

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

    authentificate(user["_id"])

    return jsonify({"id": user["_id"], "email": user["email"]}), 200


@app.post("/api/user/logout")
@login_required
def logout_user():
    session.clear()
    return jsonify({"success": True}), 200


@app.post("/api/user/follow")
@login_required
# TODO: add roles
# @roles_required
def follow_business():
    user_id = session.get("user_id")
    business_id = request.json.get("business_id")
    role = request.json.get("role")
    base_role = "viewer"

    # get the user
    user = config.DB_USERS.find_one({"_id": user_id})

    # add business to the user's following list
    follow_user = {"business_id": business_id, "role": base_role}

    config.DB_USERS.update_one(
        {"_id": user["_id"]}, {"$addToSet": {"following": follow_user}}
    )

    # add user to business's followers list
    follow_business = {"user_id": user_id, "role": base_role}

    config.DB_USERS.update_one(
        {"_id": business_id}, {"$addToSet": {"followers": follow_business}}
    )

    if role != base_role:
        # create a request for business
        follow_request = {"user_id": user_id, "role": role}
        config.DB_USERS.update_one(
            {"_id": business_id}, {"$addToSet": {"follow_requests": follow_request}}
        )

    return jsonify({"success": True}), 200


@app.post("/api/users/upload-profile-image")
@login_required
def upload():
    f = request.files["file"]

    clean_up_folder(UPLOAD_FOLDER)

    f.save(os.path.join(UPLOAD_FOLDER, f.filename))
    object_name = UPLOAD_FOLDER + "/" + f.filename
    s3_client = boto3.client("s3")
    response = s3_client.upload_file(object_name, BUCKET, object_name)

    # Construct and return the public URL of the uploaded image
    public_url = object_name

    config.DB_USERS.update_one(
        {"_id": session["user_id"]}, {"$set": {"image": public_url}}
    )

    return jsonify({"sucess": True}), 200
