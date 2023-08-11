import ssl

from config import config
from flask import Flask, session
from flask_cors import CORS
from flask_session import Session

app = Flask(__name__)
# Apply CORS to the entire application
CORS(app)

app.config.from_object(config)

server_session = Session(app)

from businesses.routes import *
from google_user.routes import *
from users.routes import *

# Configure SSL context

if __name__ == "__main__":
    app.run(debug=True, port=8000, ssl_context=config.SSL_CONTEXT)
