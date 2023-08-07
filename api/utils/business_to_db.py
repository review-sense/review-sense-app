import uuid
from datetime import datetime

# from config import config
from pymongo import MongoClient

client = MongoClient(config.MONGO_DB_LOCAL)

import bcrypt

db = client.engage_sense

users = db.users
users.drop()
users = db.users

password = "123"
hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
role = "business"
email1 = "business1@example.com"
email2 = "business2@example.com"

users.insert_one(
    {
        "_id": uuid.uuid4().hex,
        "name": "As'salam Restaurant",
        "type": "Cafe / Restaurants",
        "description": "Description for Business 1",
        "image": "business1.jpg",
        "rating": 2.5,
        "address": "783, Sheikh Zayed Road, Al Barsha 1, Hadaeq Mohammed Bin Rashid, Dubai",
        "hours": "Open",
        "time_created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "email": email1,
        "password": hashed_password,
        "role": role,
    },
)
users.insert_one(
    {
        "_id": uuid.uuid4().hex,
        "name": "Diamond Avenue",
        "type": "Jewerly store",
        "description": "Description for Business 2",
        "image": "business2.jpg",
        "rating": 4.1,
        "address": "70, Sheikh Mohammed Bin Zayed Road, Mirdif, Mushraif, Dubai",
        "hours": "Open",
        "time_created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "email": email2,
        "password": hashed_password,
        "role": role,
    },
)

for user in users.find():
    print(user)
