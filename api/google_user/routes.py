import json
from datetime import datetime

import requests
from app import app, server_session
from config import config
from flask import jsonify, redirect, request, session
from oauthlib.oauth2 import WebApplicationClient

client = WebApplicationClient(config.GOOGLE_CLIENT_ID)


def get_google_provider_cfg():
    return requests.get(config.GOOGLE_DISCOVERY_URL).json()


def authentificate(user_id):
    session["user_id"] = user_id


@app.route("/google-login")
def login():
    # Find out what URL to hit for Google login
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    # Use library to construct the request for login and provide
    # scopes that let you retrieve user's profile from Google
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=request.base_url + "/callback",
        scope=["openid", "email", "profile"],
    )
    return redirect(request_uri)


@app.route("/google-login/callback")
def callback():
    # Get authorization code Google sent back to you
    code = request.args.get("code")

    # Find out what URL to hit to get tokens that allow you to ask for
    # things on behalf of a user
    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    # Prepare and send request to get tokens! Yay tokens!
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=code,
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(config.GOOGLE_CLIENT_ID, config.GOOGLE_CLIENT_SECRET),
    )

    # Parse the tokens!
    client.parse_request_body_response(json.dumps(token_response.json()))

    # Now that we have tokens let's find and hit URL
    # from Google that gives you user's profile information,
    # including their Google Profile Image and Email
    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    # We want to make sure their email is verified.
    # The user authenticated with Google, authorized our
    # app, and now we've verified their email through Google!
    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
    else:
        return "User email not available or not verified by Google.", 400

    user = config.DB_USERS.find_one({"email": {"$eq": users_email}})

    if user is None:
        # Create a user in our db with the information provided
        # by Google
        user = {
            "_id": unique_id,
            "email": users_email,
            "time_created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            # TODO: change the role to be dynamic
            "role": "user",
        }
        config.DB_USERS.insert_one(user)

    authentificate(user["_id"])

    return jsonify({"id": user["_id"], "email": user["email"]}), 200
