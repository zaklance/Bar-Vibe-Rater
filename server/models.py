from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates, relationship
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from flask_bcrypt import Bcrypt



convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)
bcrypt = Bcrypt()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)

    ratings = db.relationship('Rating', back_populates='users')

    serialize_rules = ('-ratings.users', '-favorites.users')

    @validates('username')
    def validate_username(self, key, value):
        if not value:
            raise ValueError("Username is required")
        if len(value) < 3 or len(value) > 50:
            raise ValueError("Username must be between 3 and 50 characters")
        return value
    
    @validates('email')
    def validate_email(self, key, value):
        if not value:
            raise ValueError("Email is required")
        if "@" not in value or "." not in value:
            raise ValueError("Invalid email address")
        return value
    
    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, new_password):
        hash = bcrypt.generate_password_hash(new_password.encode('utf-8')).decode('utf-8')
        self._password = hash

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password, password.encode('utf-8'))

    def __repr__(self) -> str:
        return f"<User {self.username} {self.email}>"
    
class Bar(db.Model, SerializerMixin):
    __tablename__ = 'bars'
    id = db.Column(db.Integer, primary_key=True)
    bar_name = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    coordinates = db.Column(db.JSON, nullable=False)
    theme = db.Column(db.String)
    location = db.Column(db.String)
    hours = db.Column(db.String)

    ratings = db.relationship('Rating', back_populates='bar')
    favorites = db.relationship('Favorite', back_populates='bar')

    serialize_rules = ('-ratings.bar', '-favorites.bar')

    def __repr__(self) -> str:
        return f"<Bar {self.bar_name}>"


class Rating(db.Model, SerializerMixin):
    __tablename__ = 'ratings'
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.JSON, nullable=False)
    review = db.Column(db.String)

    bar_id = db.Column(db.Integer, db.ForeignKey('bars.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    bar = db.relationship('Bar', back_populates='ratings')
    users = db.relationship('User', back_populates='ratings')

    serialize_rules = ('-bars.ratings', '-users.ratings', '-users.id', '-users._password', '-users.email', '-bar.favorites')

    def __repr__(self) -> str:
        return f"<Rating {self.rating}>"


class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    bar_id = db.Column(db.Integer, db.ForeignKey('bars.id'))

    bar = db.relationship('Bar', back_populates='favorites')

    serialize_rules = ('-bars.favorites',)
