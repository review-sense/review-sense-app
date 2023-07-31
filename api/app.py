import places.routes as places
from config import config
from flask import Flask, session
from flask_session import Session
from flask_cors import CORS

app = Flask(__name__)
# Apply CORS to the entire application
CORS(app)

app.config.from_object(config)
# TODO: consider replacing blueprint
app.register_blueprint(places.main)

server_session = Session(app)

from users.routes import *

if __name__ == "__main__":
    app.run(debug=True, port=8000)
