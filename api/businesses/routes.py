from app import app
from config import config
from flask import jsonify, request
from users.routes import login_required, roles_required, session


@app.get("/api/businesses/all-businesses")
def get_businesses():
    businesses = []
    for business in config.DB_USERS.find({"role": {"$eq": "business"}}):
        business["posts"] = [
            post
            for post in config.DB_POSTS.find({"business_id": {"$eq": business["_id"]}})
        ]
        del business["password"]
        businesses.append(business)

    return jsonify({"data": businesses}), 200


@app.post("/api/businesses/respond-follow-request")
@login_required
@roles_required("business")
# TODO: should be logged in as a business (add login_required, roles_required)
def respond_follow_request():
    business_id = session.get("user_id")
    user_id = request.json.get("user_id")
    role = request.json.get("role")
    accept = request.json.get("accept")

    if accept:
        # update user's status in the followers list
        config.DB_USERS.update_one(
            {"_id": business_id, "followers.user_id": user_id},
            {"$set": {"followers.$.role": role}},
        )
    # delete request from follow_requests
    config.DB_USERS.update_one(
        {"_id": business_id}, {"$pull": {"follow_requests": {"user_id": user_id}}}
    )

    return jsonify({"success": True}), 200
