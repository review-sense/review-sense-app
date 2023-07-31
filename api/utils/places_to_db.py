import uuid
from datetime import datetime

# from config import config
from pymongo import MongoClient

client = MongoClient(config.MONGO_DB_LOCAL)


db = client.review_sense

places = db.places
places.drop()
places = db.places


places.insert_one(
    {
      "_id": uuid.uuid4().hex,
      "name": "As'salam Restaurant",
      "type": "Cafe / Restaurants",
      "description": "Description for Business 1",
      "image": "business1.jpg",
      "rating": 2.5,
      "address":
        "​783, Sheikh Zayed Road, Al Barsha 1, Hadaeq Mohammed Bin Rashid, Dubai",
      "hours": "Open",
      "time_created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    },
)
places.insert_one(
     {
     "_id": uuid.uuid4().hex,
      "name": "Diamond Avenue",
      "type": "Jewerly store",
      "description": "Description for Business 2",
      "image": "business2.jpg",
      "rating": 4.1,
      "address": "​70, Sheikh Mohammed Bin Zayed Road, Mirdif, Mushraif, Dubai",
      "hours": "Open",
      "time_created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    },
)

for place in places.find():
    print(place)
