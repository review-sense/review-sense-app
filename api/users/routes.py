from flask import Blueprint, request, session, jsonify
from flask_session import Session
from pymongo import MongoClient
import uuid
import bcrypt
from flask_session import Session
from functools import wraps
from datetime import datetime

from config import config

from app import app

server_session = Session(app)
db_users = MongoClient(config.MONGO_DB_LOCAL).review_sense.users
db_posts = MongoClient(config.MONGO_DB_LOCAL).review_sense.posts
db_places = MongoClient(config.MONGO_DB_LOCAL).review_sense.places
db_comments = MongoClient(config.MONGO_DB_LOCAL).review_sense.comments


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
    user["posts"] = [post for post in db_posts.find({"user_id": {"$eq": user_id}})]
    return jsonify({"user": user["email"], "posts": user["posts"]}), 200


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
        "role": role,
        "time_created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
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


@app.post("/api/user/logout")
@login_required
def logout_user():
    session.pop("user_id")
    return jsonify({"success": True}), 200


@app.post("/api/posts/create-post")
@login_required
@roles_required("business")
def create_post():
    place_id = request.json["place_id"]
    text = request.json["text"]
    user_id = session.get("user_id")

    new_post = {
        "_id": uuid.uuid4().hex,
        "user_id": user_id,
        "place_id": place_id,
        "text": text,
        "time_created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }
    db_posts.insert_one(new_post)

    return jsonify({"id": new_post["_id"], "place_id": place_id}), 200


@app.post("/api/posts/delete-post")
@login_required
@roles_required("business")
def delete_post():
    post_id = request.json["post_id"]
    post = db_posts.find_one({"_id": {"$eq": post_id}})

    if session["user_id"] != post["user_id"]:
        return jsonify({"error": "Unathorized"}), 401

    db_posts.delete_one({"_id": {"$eq": post_id}})

    return jsonify({"sucess": True}), 200


@app.get("/api/posts/post-by-id")
@login_required
@roles_required("business")
def get_post_by_id():
    post_id = request.json["post_id"]
    post = db_posts.find_one({"_id": {"$eq": post_id}})

    post["comments"] = [
        comment for comment in db_comments.find({"post_id": {"$eq": post_id}})
    ]

    return jsonify({"post": post}), 200


@app.post("/api/comments/create-comment")
@login_required
@roles_required("business")
def create_comment():
    post_id = request.json["post_id"]
    text = request.json["text"]
    user_id = session.get("user_id")

    new_comment = {
        "_id": uuid.uuid4().hex,
        "user_id": user_id,
        "post_id": post_id,
        "text": text,
        "time_created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }
    db_comments.insert_one(new_comment)

    return jsonify({"id": new_comment["_id"], "post_id": post_id}), 200


@app.post("/api/comments/delete-comment")
@login_required
@roles_required("business")
def delete_comment():
    comment_id = request.json["comment_id"]
    comment = db_comments.find_one({"_id": {"$eq": comment_id}})

    if session["user_id"] != comment["user_id"]:
        return jsonify({"error": "Unathorized"}), 401

    db_comments.delete_one({"_id": {"$eq": comment_id}})

    return jsonify({"sucess": True}), 200
