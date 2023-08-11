import uuid
from datetime import datetime

# from config import config
from pymongo import MongoClient

client = MongoClient("MONGO_DB_LOCAL")

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
        "name": "CookingPal",
        "type": "Cafe / Restaurants",
        "description": "Cooking Supplies",
        "image": "business1.jpg",
        "rating": 2.5,
        "address": "783, Sheikh Zayed Road, Al Barsha 1, Hadaeq Mohammed Bin Rashid, Dubai",
        "hours": "Open",
        "time_created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "email": email1,
        "password": hashed_password,
        "role": role,
        "image": "https://engagesense-test.s3.amazonaws.com/uploads/default-business.png",
    },
)
users.insert_one(
    {
        "_id": uuid.uuid4().hex,
        "name": "Sewing Machines",
        "type": "Jewerly store",
        "description": "Sevwing Machines",
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
