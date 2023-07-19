from dotenv import load_dotenv, find_dotenv
import os

env = load_dotenv(".env.development")


class Config:
    MONGO_DB_LOCAL = os.environ.get("MONGO_DB_LOCAL")
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SESSION_TYPE = "filesystem"


config = Config()
