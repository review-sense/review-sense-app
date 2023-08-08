from config import config
from flask import Flask, session
from flask_session import Session
from flask_cors import CORS
import ssl

app = Flask(__name__)
# Apply CORS to the entire application
CORS(app)

app.config.from_object(config)

server_session = Session(app)

from businesses.routes import *
from google_user.routes import *
from users.routes import *

# Configure SSL context
ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain(certfile='certificates/cert.pem', keyfile='certificates/key.pem')

if __name__ == "__main__":
    app.run(debug=True, port=8000, ssl_context=ssl_context)
