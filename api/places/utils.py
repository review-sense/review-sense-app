from pymongo import MongoClient
from config import config
from flask import jsonify
import uuid

client = MongoClient(config.MONGO_DB_LOCAL)


def get_all_places():
    db_places = client.review_sense.places
    db_posts = client.review_sense.posts

    places = []
    for place in db_places.find():
        place["posts"] = [
            post for post in db_posts.find({"place_id": {"$eq": place["_id"]}})
        ]
        places.append(place)

    return jsonify({"places": places}), 200
