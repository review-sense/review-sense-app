from pymongo import MongoClient
from config import config
import json
import uuid

client = MongoClient(config.MONGO_DB_LOCAL)


def get_all_places():
    db = client.review_sense
    places = db.places
    return json.dumps([place for place in places.find()]), 200
