import os

from dotenv import load_dotenv
from pymongo import MongoClient

env = load_dotenv(".env.development")


class Config:
    MONGO_DB_LOCAL = os.environ.get("MONGO_DB_LOCAL")
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SESSION_TYPE = "filesystem"

    # google client
    GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
    GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
    GOOGLE_DISCOVERY_URL = (
        "https://accounts.google.com/.well-known/openid-configuration"
    )

    # Databases
    DB_USERS = MongoClient(MONGO_DB_LOCAL).engage_sense.users
    DB_POSTS = MongoClient(MONGO_DB_LOCAL).engage_sense.posts
    DB_BUSINESSES = MongoClient(MONGO_DB_LOCAL).engage_sense.businesses
    DB_COMMENTS = MongoClient(MONGO_DB_LOCAL).engage_sense.comments


config = Config()
