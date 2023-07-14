from pymongo import MongoClient
import uuid

client = MongoClient(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1"
)

db = client.review_sense

places = db.places
places.drop()
places = db.places

# Средний чек, оценка, количество оценок

places.insert_one(
    {"_id": uuid.uuid4().hex, "title": "starbuck", "description": "best coffee"}
)
places.insert_one(
    {"_id": uuid.uuid4().hex, "title": "starbuck 2", "description": "best coffee 2"}
)

for place in places.find():
    print(place)
