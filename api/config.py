import os
import ssl

from dotenv import load_dotenv
from pymongo import MongoClient

env = load_dotenv(".env.development")


class Config:
    MONGO_DB_LOCAL = os.environ.get("MONGO_DB_LOCAL")
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SESSION_TYPE = "filesystem"

    # google client
    GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET")
    GOOGLE_DISCOVERY_URL = (
        "https://accounts.google.com/.well-known/openid-configuration"
    )

    AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")

    # Databases
    DB_USERS = MongoClient(MONGO_DB_LOCAL).engage_sense.users
    DB_POSTS = MongoClient(MONGO_DB_LOCAL).engage_sense.posts
    DB_BUSINESSES = MongoClient(MONGO_DB_LOCAL).engage_sense.businesses
    DB_COMMENTS = MongoClient(MONGO_DB_LOCAL).engage_sense.comments

    SSL_CONTEXT = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    SSL_CONTEXT.load_cert_chain(
        certfile="certificates/cert.pem", keyfile="certificates/key.pem"
    )


config = Config()
