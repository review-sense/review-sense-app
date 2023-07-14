from flask import Flask
import places.routes as places

app = Flask(__name__)
app.register_blueprint(places.main)


@app.route("/")
def hello():
    return "Hello, World!"


if __name__ == "__main__":
    app.run(debug=True, port=3000)
