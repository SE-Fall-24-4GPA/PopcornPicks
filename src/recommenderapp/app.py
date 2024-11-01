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
import jwt
import datetime
from flask import Flask, jsonify, render_template, request, g
from flask_cors import CORS
import mysql.connector
import pickle
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
from utils import get_wall_posts
from utils import submit_review
from utils import create_account
from utils import login_to_account
from search import Search
from item_based import recommend_for_new_user
search_instance = Search()


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
    
@app.route("/search", methods=["POST"])
def search_movies():
    data = request.get_json()
    query = data.get("q", "")

    if not query:
        return jsonify({"error": "Empty query"}), 400

    # Get top 10 search results
    results = search_instance.results_top_ten(query)
    return jsonify(results), 200


@app.route("/reviews", methods=["GET"])
def wall_posts():
    return get_wall_posts(g.db)


@app.route("/review", methods=["POST"])
def review():
    data = request.get_json()
    
    # Check if the required data is present
    if not data or "movie" not in data or "score" not in data or "review" not in data:
        return jsonify({"error": "Invalid or incomplete data"}), 400
    
    # Replace with the actual user ID or context as needed
    user_id = 1  # Example user ID, replace with actual session or request context
    
    try:
        # Submit the review using the provided data
        submit_review(g.db, user_id, data["movie"], data["score"], data["review"])
        return jsonify({"message": "Review submitted successfully"}), 201
    except Exception as e:
        print(f"Error submitting review: {e}")
        return jsonify({"error": "Could not submit review"}), 500


@app.route("/signup", methods=["POST"])
def create_acc():
    """
    Handles creating a new account
    """
    data = request.get_json()

    # Validate the input data
    if not data or "email" not in data or "username" not in data or "password" not in data:
        return jsonify({"error": "Invalid or incomplete data"}), 400

    try:
        create_account(g.db, data["email"], data["username"], data["password"])
        return jsonify({"message": "Sign up is successful"}), 200
    except Exception as e:
        # Log the exception for debugging purposes
        app.logger.error(f"Error creating account: {str(e)}")
        return jsonify({"error": "An entry with this username or email already exists, Please try with different username."}), 500


SECRET_KEY = "popcornpicks"  
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data or "username" not in data or "password" not in data:
        return jsonify({"error": "Invalid or incomplete data", "status": "fail"}), 400
    
    try:
        resp = login_to_account(g.db, data["username"], data["password"])
        if resp is None:
            return jsonify({"error": "Invalid username or password", "status": "fail"}), 401

        # Generate token without expiry
        token = jwt.encode({
            "user_id": resp,
        }, SECRET_KEY, algorithm="HS256")
        
        return jsonify({"message": "Login is successful", "token": token, "status": "success"}), 200
    
    except Exception as e:
        app.logger.error(f"Login failed: {str(e)}")
        return jsonify({"error": "Login failed, please check your credentials", "status": "fail"}), 401





if __name__ == "__main__":
    app.run(port=5000)
