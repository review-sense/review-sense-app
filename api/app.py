from config import config
from flask import Flask, session
from flask_session import Session

app = Flask(__name__)
app.config.from_object(config)

server_session = Session(app)

from businesses.routes import *
from users.routes import *

if __name__ == "__main__":
    app.run(debug=True, port=8000)
