
from flask import Flask, render_template, request,make_response,jsonify
from models.courserarec import CourseRecommender
from models.movierec import MovieRecommender
from models.bookrec import BookRecommender  
import pandas as pd
import pickle
import os
from models.restrec import RestaurantRecommender
from models.udemy import UdemyRecommender
from models.webseriesrec import WebSeriesRecommender
from flask_cors import CORS
import json

script_dir = os.path.dirname(os.path.abspath(__file__))

# Set the working directory to the script directory
os.chdir(script_dir)

# Print the current working directory to confirm the change
# print("Current Working Directory:", os.getcwd())
import pickle
import bz2

# Load the pickle file containing the web model
with open('web_model_clean', 'rb') as f:
    web_model = pickle.load(f)

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/booksm', methods=['GET', 'POST'])
def books():
    if request.method == 'POST':
        book_name = request.json.get('book_name')
        book_recommender = BookRecommender()
        recommendations = book_recommender.recommend_books(book_name)
        response = make_response({"recommendations": recommendations})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers['Access-Control-Allow-Methods'] = 'POST','GET'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

        return response  # or use bookrec.recommend_bow
    #     return render_template('booksm.html', recommendations=recommendations,book_name=book_name)
    # return render_template('booksm.html', recommendations=[])

@app.route('/moviesm', methods=['GET', 'POST'])
def movies():
    if request.method == 'POST':
        movie_name = request.json.get('movie_name')
        movie_recommender = MovieRecommender()
        recommendations = movie_recommender.recommend_movies_tf(movie_name) 
        for recommendation in recommendations:
            recommendation['Id'] = int(recommendation['Id'])
        response = make_response({"recommendations": recommendations})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers['Access-Control-Allow-Methods'] = 'POST','GET'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

        return response # Assuming a similar function in movierec.py
    #     return render_template('moviesm.html', recommendations=recommendations,movie_name=movie_name)
    # return render_template('moviesm.html', recommendations=[])

@app.route('/webseries', methods=['GET', 'POST'])
def webseries():
    if request.method == 'POST':
        series_name = request.json['series_name']
        webseries_recommender = WebSeriesRecommender()
        recommendations = webseries_recommender.recommend_web_series(series_name)
        response = make_response({"recommendations": recommendations})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers['Access-Control-Allow-Methods'] = 'POST','GET'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

        return response
    #     return render_template('webseries.html', recommendations=recommendations, series_name=series_name)
    # return render_template('webseries.html', recommendations=None)

@app.route('/udemy', methods=['GET', 'POST'])
def udemy():
    if request.method == 'POST':
        title_utf = request.json['title_utf']
        print(title_utf)
        title_utf_recommender = UdemyRecommender()
        recommendations = title_utf_recommender.recommend_utf(title_utf)
        response = make_response({"recommendations": recommendations})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers['Access-Control-Allow-Methods'] = 'POST','GET'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

        return response
    #     return render_template('udemy.html', recommendations=recommendations, title_utf=title_utf)
    # return render_template('udemy.html', recommendations=None)

@app.route('/coursera', methods=['GET', 'POST'])
def coursera():
    if request.method == 'POST':
        course_name = request.json['course_name']
        course_name_recommender = CourseRecommender()
        recommendations = course_name_recommender.recommend_ctf(course_name)
        response = make_response({"recommendations": recommendations})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers['Access-Control-Allow-Methods'] = 'POST','GET'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

        return response
    #     return render_template('coursera.html', recommendations=recommendations, course_name=course_name)
    # return render_template('coursera.html', recommendations=None)

@app.route('/restaurants', methods=['GET', 'POST'])
def recommend_restaurants():
    if request.method == 'POST':
        city_name = request.json['city_name']
        restaurant_name = request.json['restaurant_name']
        restaurant_recommender = RestaurantRecommender()
        recommendations = restaurant_recommender.recommend_bow_city(restaurant_name, city_name)
        response = make_response({"recommendations": recommendations})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers['Access-Control-Allow-Methods'] = 'POST','GET'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

        return response
    #     return render_template('restaurants.html', recommendations=recommendations, city_name=city_name, restaurant_name=restaurant_name)
    # return render_template('restaurants.html', recommendations=None)

# testing

# @app.route('/data.json')
# def get_data():
#     # Load PKL file
#     with open('udemy_clean.pkl', 'rb') as f:
#         data = pickle.load(f)
    
#     # Convert to JSON
#     json_data = [{'key': key, 'value': value} for key, value in data.items()]
#     print(json_data)
#     return jsonify(json_data)




if __name__ == '__main__':
    # Change the host parameter to '0.0.0.0' to listen on all network interfaces
    app.run(host='0.0.0.0', port=5000)

