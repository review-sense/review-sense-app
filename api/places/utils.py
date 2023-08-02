import uuid

from config import config
from flask import jsonify
from pymongo import MongoClient


def get_all_places():
    places = []
    for place in config.DB_PLACES.find():
        place["posts"] = [
            post for post in config.DB_POSTS.find({"place_id": {"$eq": place["_id"]}})
        ]
        places.append(place)

    return jsonify({"data": places}), 200
