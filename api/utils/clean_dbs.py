import os

from dotenv import load_dotenv
from pymongo import MongoClient

env = load_dotenv(".env.development")


def clean():
    MONGO_DB_LOCAL = os.environ.get("MONGO_DB_LOCAL")

    # Databases
    DB_USERS = MongoClient(MONGO_DB_LOCAL).engage_sense.users
    DB_POSTS = MongoClient(MONGO_DB_LOCAL).engage_sense.posts
    DB_BUSINESSES = MongoClient(MONGO_DB_LOCAL).engage_sense.businesses
    DB_COMMENTS = MongoClient(MONGO_DB_LOCAL).engage_sense.comments

    DB_USERS.drop()
    DB_POSTS.drop()
    DB_BUSINESSES.drop()
    DB_COMMENTS.drop()


if __name__ == "__main__":
    clean()
