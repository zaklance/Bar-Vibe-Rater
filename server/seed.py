from app import app
from faker import Faker
from random import random, choice, randint, uniform
from models import db, User, Bar, Rating, Favorite, bcrypt

fake = Faker()

def run():
    User.query.delete()
    Bar.query.delete()
    Rating.query.delete()
    Favorite.query.delete()


    # add fake users
    users = []

    for i in range(100):
        username = fake.user_name()
        password = fake.password()
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        email = fake.ascii_free_email()
        # favorite_markets = str([randint(1, 40) for _ in range(randint(2, 4))])
        # favorite_vendors = str([randint(1, 150) for _ in range(randint(3, 9))])

        u = User(
            username=username,
            password=hashed_password,
            email=email,
        )
        users.append(u)

    db.session.add_all(users)
    db.session.commit()

    # add fake Bars
    word_list = fake.get_words_list()
    bar_noun = ['Bar', 'Pub', 'Elixirs', 'Lounge', 'Spirits', 'Cocktails', 'Cantina', 'Tavern', 'Public House']
    lat_up = 40.74967913697264
    lat_low = 40.710186757786815
    lon_left = -74.00684649410894
    lon_right = -73.9757766891443

    bars = []
    for i in range(200):
        bar_name = choice([f'{choice(word_list).title()} {choice(bar_noun)}', f'{choice(word_list).title()} {choice(bar_noun)}', f'{choice(word_list).title()} {choice(bar_noun)}', f'{choice(word_list).title()} {choice(bar_noun)}', f'{choice(word_list).title()} {randint(0, 100)}', f'{fake.color_name().title()} {choice(word_list).title()} {choice(bar_noun)}', f'{fake.color_name().title()} {choice(bar_noun)}', f"{fake.first_name()}'s {choice(bar_noun)}"])
        lat = uniform(lat_low, lat_up)
        lon = uniform(lon_right, lon_left)

        b = Bar(
            bar_name=bar_name,
            latitude=lat,
            longitude=lon
        )
        bars.append(b)

    db.session.add_all(bars)
    db.session.commit()


    # add fake Ratings
    ratings = []
    for i in range(800):
        bar_id = randint(1, 200)
        user_id = randint(1, 100)
        rating = [randint(1,7) for i in range(7)]

        r = Rating(
            bar_id=bar_id,
            user_id=user_id,
            rating=rating
        )
        ratings.append(r)
    
    db.session.add_all(ratings)
    db.session.commit()


    # add fake Favorites
    favs = []
    for i in range(250):
        user_id=randint(1, 100)
        bar_id=randint(1, 200)

        f = Favorite(
            user_id=user_id,
            bar_id=bar_id
        )
        favs.append(f)

    db.session.add_all(favs)
    db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        run()