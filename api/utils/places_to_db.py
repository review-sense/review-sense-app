import uuid
from datetime import datetime

from config import config
from pymongo import MongoClient

client = MongoClient(config.MONGO_DB_LOCAL)


db = client.review_sense

places = db.places
places.drop()
places = db.places


places.insert_one(
    {
        "_id": uuid.uuid4().hex,
        "title": "Place 1",
        "description": "Description of place 1",
        "time_created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }
)
places.insert_one(
    {
        "_id": uuid.uuid4().hex,
        "title": "Place 2",
        "description": "Description of place 2",
        "time_created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }
)

for place in places.find():
    print(place)
