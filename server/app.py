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

@app.route('/', methods=['GET'])
def homepage():
    return {"message": "Welcome to Bar Vibe Rater!"}, 200

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter(User.username == data['username']).first()
    if not user:
        return {'error': 'login failed'}, 401
    
    if not user.authenticate(data['password']):
        return {'error': 'login failed'}, 401
    
    session['user_id'] = user.id
    
    return user.to_dict(), 200


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    user = User.query.filter(User.username == data['username']).first()
    if user:
        return {'error': 'username already exists'}, 400
    new_user = User(
        username=data['username'], 
        password=data['password'],
        email=data['email']
    )
    db.session.add(new_user)
    db.session.commit()
    return new_user.to_dict(), 201


@app.route('/logout', methods=['DELETE'])
def logout():
    session.pop('user_id', None)
    return {}, 204


@app.route('/bars', methods=['GET'])
def all_bars():
    if request.method == 'GET':
        bars = Bar.query.all()
        return jsonify([bar.to_dict() for bar in bars]), 200


@app.route('/users', methods=['GET'])
def all_users():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify([user.to_dict() for user in users]), 200


@app.route('/ratings', methods=['GET', 'POST'])
def all_ratings():
    if request.method == 'GET':
        ratings = Rating.query.all()
        return jsonify([rating.to_dict() for rating in ratings]), 200
    elif request.method == 'POST':
        data = request.get_json()
        try:
            new_rating = Rating(
                rating=data.get('rating'),
                bar_id=data.get('bar_id'),
                user_id=data.get('user_id'),
                # bar_name=data.get('bar_name')
            )
        except ValueError:
            return {'error': 'validation failed'}, 400
        db.session.add(new_rating)
        db.session.commit()

        return new_rating.to_dict(), 201


@app.route('/favorites', methods=['GET', 'POST'])
def all_favs():
    if request.method == 'GET':
        favs = Favorite.query.all()
        return jsonify([fav.to_dict() for fav in favs]), 200
    
    elif request.method == 'POST':
        data = request.get_json()
        new_favorite = Favorite(
            user_id=data['user_id'],
            bar_id=data['bar_id']
        )
        db.session.add(new_favorite)
        db.session.commit()
        return new_favorite.to_dict(), 201

@app.route('/favorites/<int:id>', methods=['GET', 'DELETE'])
def del_fav(id):
    fav = Favorite.query.filter(Favorite.id == id).first()
    if request.method == 'GET':
        return fav.to_dict(), 200
    if request.method == 'DELETE':
        db.session.delete(fav)
        db.session.commit()
        return {}, 204


if __name__ == '__main__':
    app.run(port=5555, debug=True)