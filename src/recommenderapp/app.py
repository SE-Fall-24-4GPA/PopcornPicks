"""
Copyright (c) 2023 Nathan Kohen, Nicholas Foster, Brandon Walia, Robert Kenney
This code is licensed under MIT license (see LICENSE for details)

@author: PopcornPicks
"""
# pylint: disable=wrong-import-position
# pylint: disable=wrong-import-order
# pylint: disable=import-error

import json
import sys
import os
from flask import Flask, jsonify, render_template, request, g
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
# from utils import (
#     beautify_feedback_data,
#     send_email_to_user,
#     create_account,
#     login_to_account,
#     submit_review,
#     get_wall_posts,
#     get_recent_movies,
#     get_username,
#     add_friend,
#     get_friends,
#     get_recent_friend_movies,
# )
from utils import get_friends
from utils import get_username
from utils import get_recent_movies
from utils import add_friend
from search import Search


sys.path.append("../../")

sys.path.remove("../../")


app = Flask(__name__)
app.secret_key = "secret key"

cors = CORS(app, resources={r"/*": {"origins": "*"}})
user = {1: None}

load_dotenv()

# process this before each request
@app.before_request
def before_request():
    """
    Opens the db connection
    """
    load_dotenv()
    g.db = mysql.connector.connect(
        user="root",
        password=os.getenv("DB_PASSWORD"),
        host="127.0.0.1",
        database="popcornpicksdb"
    )

# process this after every request
def after_request(response):
    """
    Closes the db connecttion
    """
    g.db.close()
    return response

# test route
@app.route("/")
def hello():
    return "hello"

@app.route("/getUserName", methods=["GET"])
def getUsername():
    """
    Get username of the current user
    """
    username = get_username(g.db,1)
    return username


@app.route("/getFriends", methods=["GET"])
def getFriends():
    """
    Gets friends of the current user
    """
    friends = get_friends(g.db, 1)
    return friends

@app.route("/getRecentMovies", methods=["GET"])
def getRecentMovies():
    """
    Gets recent movies of the current user
    """
    recent_movies = get_recent_movies(g.db, 1)
    return recent_movies

@app.route("/friend", methods=["POST"])
def add_friend_route():
    data = request.get_json()
    username = data.get("user")  # Friend's username from the request
    user_id = 1  # Replace this with the actual user's ID, e.g., session or request context

    if not username or not user_id:
        return jsonify({"error": "Invalid data"}), 400

    # Call add_friend with proper user_id
    try:
        add_friend(g.db, username, user_id)
        return jsonify({"message": "Friend added successfully"}), 200
    except Exception as e:
        print(f"Error adding friend: {e}")
        return jsonify({"error": "Could not add friend"}), 500



if __name__ == "__main__":
    app.run(port=5000)
