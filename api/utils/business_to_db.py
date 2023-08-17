import random
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
email = "business"

businesses = [
    {"name": "Biktrix Bikes", "url": "biktrix.ca", "category": "e-Bikes"},
    {"name": "AJ Madison", "url": "ajmadison.com", "category": "Appliances"},
    {"name": "Acuva Tech", "url": "acuvatech.com", "category": "Electronics"},
    {"name": "Multimac", "url": "multimac.com", "category": "Car Accessories"},
    {"name": "Newell Brands", "url": "newellbrands.com", "category": "Car Accessories"},
    {"name": "Dorel", "url": "doreleurope.com", "category": "Furniture"},
    {"name": "Magna International", "url": "magna.com", "category": "Cars"},
    {"name": "EMV Auto", "url": "emvauto.com", "category": "Cars (3 wheeled)"},
    {"name": "Linamar", "url": "linamar.com", "category": "Car Accessories"},
    {
        "name": "East Wood Guitars",
        "url": "eastwoodguitars.com",
        "category": "Musical Instruments",
    },
]


for i, business in enumerate(businesses):
    users.insert_one(
        {
            "_id": uuid.uuid4().hex,
            "name": business["name"],
            "description": "Sevwing Machines",
            "url": business["url"],
            "category": business["category"],
            "logo": f"uploads/business{i+1}.jpg",
            "rating": round(i * random.random(), 2),
            "address": "",
            "hours": "Open",
            "time_created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "email": email + f"{i+1}@example.com",
            "password": hashed_password,
            "role": role,
        },
    )

print("Done")
