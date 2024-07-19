import os
import json
from flask import Flask, request, jsonify, session
from models import db, User, Bar, Rating, Favorite, bcrypt
from dotenv import load_dotenv
from flask_migrate import Migrate
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.environ['SECRET_KEY']

db.init_app(app)
Migrate(app, db)
CORS(app, supports_credentials=True)




if __name__ == '__main__':
    app.run(port=5555, debug=True)