from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.json_util import dumps

app = Flask(__name__)
CORS(app)

uri = "mongodb+srv://root:ZJNWbo0QmvW2XNPC@cs4320-northstars.hutuhng.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(uri)

db = client["volunteer"]


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/login", methods=["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
    user = db.users.find_one({"email": email, "password": password}, {"password": 0})
    return jsonify(user)


@app.route("/new-account", methods=["POST"])
def new_account():
    email = request.json.get("email")
    password = request.json.get("password")
    firstName = request.json.get("firstName")
    lastName = request.json.get("lastName")
    cellPhone = request.json.get("cellPhone")
    hours = request.json.get("hours")
    postal = request.json.get("postal")

    user = db.users.find_one({"email": email})
    if user:
        return jsonify(None)
    else:
        db.users.insert_one(
            {
                "email": email,
                "password": password,
                "firstName": firstName,
                "lastName": lastName,
                "cellPhone": cellPhone,
                "hours": hours,
                "postal": postal,
            }
        )
        new_user = db.users.find_one({"email": email}, {"password": 0})
        return jsonify(dumps(new_user))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5555)
