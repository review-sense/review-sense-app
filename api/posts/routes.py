import uuid
from datetime import datetime

from app import app, server_session
from config import config
from flask import jsonify, request, session
from users.routes import login_required, roles_required


@app.post("/api/posts/create-post")
@login_required
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
    config.DB_POSTS.insert_one(new_post)

    return jsonify({"id": new_post["_id"], "place_id": place_id}), 200


@app.post("/api/posts/delete-post")
@login_required
def delete_post():
    post_id = request.json["post_id"]
    post = config.DB_POSTS.find_one({"_id": {"$eq": post_id}})

    if session["user_id"] != post["user_id"]:
        return jsonify({"error": "Unathorized"}), 401

    config.DB_POSTS.delete_one({"_id": {"$eq": post_id}})

    return jsonify({"sucess": True}), 200


@app.get("/api/posts/post-by-id")
def get_post_by_id():
    post_id = request.json["post_id"]
    post = config.DB_POSTS.find_one({"_id": {"$eq": post_id}})

    post["comments"] = [
        comment for comment in config.DB_COMMENTS.find({"post_id": {"$eq": post_id}})
    ]

    return jsonify({"post": post}), 200


@app.post("/api/comments/create-comment")
@login_required
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
    config.DB_COMMENTS.insert_one(new_comment)

    return jsonify({"id": new_comment["_id"], "post_id": post_id}), 200


@app.post("/api/comments/delete-comment")
@login_required
def delete_comment():
    comment_id = request.json["comment_id"]
    comment = config.DB_COMMENTS.find_one({"_id": {"$eq": comment_id}})

    if session["user_id"] != comment["user_id"]:
        return jsonify({"error": "Unathorized"}), 401

    config.DB_COMMENTS.delete_one({"_id": {"$eq": comment_id}})

    return jsonify({"sucess": True}), 200
