from app import app
from faker import Faker
from random import random, choice, randint, uniform
from models import db, User, Bar, Rating, Favorite, bcrypt
import json

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
        # hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        email = fake.ascii_free_email()
        # favorite_markets = str([randint(1, 40) for _ in range(randint(2, 4))])
        # favorite_vendors = str([randint(1, 150) for _ in range(randint(3, 9))])

        u = User(
            username=username,
            password=password,
            email=email,
        )
        users.append(u)

        zl = User(
            username="zlance",
            password="123",
            email="nowayman@proton.me"
        )

    db.session.add_all(users)
    db.session.add(zl)
    db.session.commit()



    # add fake Bars
    word_list = fake.get_words_list()
    bar_noun = ['Bar', 'Pub', 'Elixirs', 'Lounge', 'Spirits', 'Cocktails', 'Cantina', 'Tavern', 'Public House']
    lat_up = 40.74967913697264
    lat_low = 40.710186757786815
    lon_left = -74.00684649410894
    lon_right = -73.9757766891443
    images = [
        'https://assets3.thrillist.com/v1/image/3060915/792x528',
        'https://www.skouttravel.com/wp-content/uploads/2018/01/White-Horse-1.jpg',
        'https://img-us.didaudo.net/us-locations/US/000/000/295/the-19-best-bars-with-games-in-new-york-city.jpg',
        'https://img-us.didaudo.net/us-locations/US/000/000/295/barcade.jpg?output=webp&fit=cover&w=800&h=600',
        'https://edition.swingers.club/wp-content/uploads/2023/04/Best-Bars-in-Dupont-Circle.jpg',
        'https://www.silverchef.com.au/cdn/shop/articles/36.jpg?v=1565665550',
        'https://austin.culturemap.com/media-library/bar-of-the-year-tiki-tatsu-ya.jpg?id=29818042&width=2000&height=1500&quality=65&coordinates=0%2C0%2C0%2C0',
        'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_1028,q_75,w_1030/v1/clients/dallasites101/Screenshot_2023_07_06_at_3_33_37_PM_1151d9a2-98db-43f1-8b7e-a5481210a2df.png',
        'https://theresandiego.com/wp-content/uploads/Side-Bar-San-Diego-Remodel-Club-Interior-1024x683.jpeg',
        'https://images.huffingtonpost.com/2016-10-25-1477355149-2785521-playground.jpg',
        'https://offloadmedia.feverup.com/secretnyc.co/wp-content/uploads/2022/03/25080507/shutterstock_1874451847-1024x683.jpg',
        'https://assets-eu-01.kc-usercontent.com/aa24ba70-9a12-01ae-259b-7ef588a0b2ef/50123d42-55c2-4dfb-a97f-d15b6a550284/Nearys-pub-4.jpg',
        'https://res.cloudinary.com/the-infatuation/image/upload/c_fill,w_3840,ar_4:3,g_center,f_auto/images/seattle_bar_photography_rough_and_tumble_feeditcreative43_r8nvhn',
        'https://cdn.vox-cdn.com/thumbor/sP04IaWDQ0QztvL6W4MzklhYtxQ=/0x0:1496x894/1200x900/filters:focal(629x328:867x566):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/65127157/MadisonPub.0.png',
        'https://res.cloudinary.com/sagacity/image/upload/c_crop,h_2000,w_3000,x_0,y_0/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/rough-tumble-seattle-womens-sports-bar-brooke-fitts_fcgu28.jpg',
        'https://res.cloudinary.com/sagacity/image/upload/c_crop,h_1825,w_2738,x_0,y_0/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1200/golfcourse_tjoesr.jpg',
        'https://assets3.thrillist.com/v1/image/3061280/750x500/flatten;crop;webp=auto;jpeg_quality=50.jpg',
        'https://offloadmedia.feverup.com/secretseattle.co/wp-content/uploads/2023/01/13023423/octopusbarseattle-1024x683.jpeg',
        'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_560,q_60,w_960/v1/clients/neworleans/NOTMC_7604_4b84b710-3613-4c6e-a125-941c43a2391f.jpg'
    ]
    streetsEW = [
        'Broadway',
        'Lafayette',
        'Mott',
        'Allen',
        'Mercer',
        'Eldridge',
        'Orchard',
        'Wooster',
        'Bowery',
        'Thompson',
        'Ludlow',
        'Essex',
        '2nd',
        '3rd',
        '4th',
        '5th',
        '6th',
        '7th',
        '8th',
        '9th',
        '10th',
        '11th',
        '12th',
        '13th',
        '14th',
        '15th',
        '16th',
        '17th',
        '18th',
        '19th',
        '20th',
        '21st',
        '22nd',
        '23rd',
        '24th',
        '25th',
        '26th',
        '27th',
        '28th'
    ]
    streetsNS = [
        'Spring St',
        'St Marks St',
        'Houston St',
        'Hester St',
        'Canal St',
        'Grand St',
        'Broome St',
        'Bleecker St',
        'Elizabeth St'
    ]
    avenue = [
        'Avenue D',
        'Avenue C',
        'Avenue B',
        'Avenue A',
        'First Ave',
        'Second Ave',
        'Third Ave',
        'Fourth Ave',
        'Park Ave',
        'Fifth Ave',
        'Sixth Ave',
        'Seventh Ave',
        'Eighth Ave',
        'Ninth Ave',
        'Tenth Ave'
    ]

    bars = []
    for i in range(200):
        bar_name = choice([f'{choice(word_list).title()} {choice(bar_noun)}', f'{choice(word_list).title()} {choice(bar_noun)}', f'{choice(word_list).title()} {choice(bar_noun)}', f'{choice(word_list).title()} {choice(bar_noun)}', f'{choice(word_list).title()} {randint(0, 100)}', f'{fake.color_name().title()} {choice(word_list).title()} {choice(bar_noun)}', f'{fake.color_name().title()} {choice(bar_noun)}', f"{fake.first_name()}'s {choice(bar_noun)}"])
        location = {f"lat": f"{uniform(lat_low, lat_up)}", f"lng": f"{uniform(lon_right, lon_left)}"}

        b = Bar(
            bar_name=bar_name,
            location=location
        )
        bars.append(b)

    db.session.add_all(bars)
    db.session.commit()


    # add fake Ratings
    ratings = []
    for i in range(1000):
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
    for i in range(400):
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