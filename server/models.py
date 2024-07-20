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
        hash = bcrypt.generate_password_hash(new_password.encode('utf-8'))
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
    latitude = db.Column(db.Double, nullable=False)
    longitude = db.Column(db.Double, nullable=False)

    # ratings = db.relationship('Rating', back_populates='bar_name')

    def __repr__(self) -> str:
        return f"<Bar {self.bar_name}>"


class Rating(db.Model, SerializerMixin):
    __tablename__ = 'ratings'
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.JSON, nullable=False)

    # bar_name = db.relationship('Bar', back_populates='ratings')

    bar_id = db.Column(db.Integer, db.ForeignKey('bars.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self) -> str:
        return f"<Rating {self.rating}>"


class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    bar_id = db.Column(db.Integer, db.ForeignKey('bars.id'))
