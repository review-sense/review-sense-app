from dotenv import load_dotenv
import os

env = load_dotenv("env.development")


class Config:
    MONGO_DB_LOCAL = os.environ.get("MONGO_DB_LOCAL")


config = Config()
