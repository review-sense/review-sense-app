from flask import Flask
import places.routes as places
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(places.main)

from users.routes import *


if __name__ == "__main__":
    app.run(debug=True, port=3000)
