#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import request
from api.utils.responses import response_with
from api.utils import responses as resp

from api.models.user import users
from api.models.preferences import preferences
from api.utils.keys import Keys
import joblib
import pandas as pd
import numpy as np
import pymongo
import json
from bson.objectid import ObjectId
from yelp.client import Client
import requests
import json
import urllib
import time
import collections
route_path_general = Blueprint("route_path_general", __name__)

@route_path_general.route('/v1.0/getuser/<string:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user_id = ObjectId(user_id)
        user = users.objects(_id=user_id)
        return response_with(resp.SUCCESS_200, value={"user": user.to_json()})
    except Exception:
        return response_with(resp.INVALID_INPUT_422)

@route_path_general.route('/v1.0/createuser/', methods=['POST'])
def create_user():
    try:
        password = request.form['password']
        name = request.form['name']
        user_id = ObjectId()
        datetime = user_id.generation_time
        newUser = users(password=password, name=name, _id=user_id, register_date=datetime)
        newUser.save()
        user = users.objects(_id=user_id)
        return response_with(resp.SUCCESS_200, value={"user": user.to_json()})
    except Exception:
        return response_with(resp.INVALID_INPUT_422)

@route_path_general.route('/v1.0/getpreferences/<string:user_id>', methods=['GET'])
def get_preferences(user_id):

    try:
        user_id = ObjectId(user_id)
        user = preferences.objects(_id=user_id)
        return response_with(resp.SUCCESS_200, value={"preferences": user.to_json()})
    except Exception:
        return response_with(resp.INVALID_INPUT_422)

@route_path_general.route('/v1.0/generaterecommendations/<string:user_id>', methods=['GET'])
def generate_recommendations(user_id):
    try:
        return response_with(resp.SUCCESS_200, value={"businesses": get_recommendation_list(user_id)})
    except Exception:
        return response_with(resp.INVALID_INPUT_422)

@route_path_general.route('/v1.0/generateusers/', methods=['GET']) #generate ten random users
def generate_users():
    try:
        svdpp = joblib.load(Keys.PKL_DIR) #need to put ENTIRE filepath here (e.g. /Users/name/.../src/svdpp_las_vegas_existing_user_model.pkl)
        us_restaurant_review_lasvegas_nv = pd.read_csv(Keys.CSV_DIR) #need to put ENTIRE filepath here (e.g. /Users/name/.../src/us_restaurant_review_lasvegas_nv.csv)
        user_ids = us_restaurant_review_lasvegas_nv['user_id'].unique().tolist()
        return response_with(resp.SUCCESS_200, value={"users": user_ids[0:10]})
    except Exception:
        return response_with(resp.INVALID_INPUT_422)

@route_path_general.route('/v1.0/generatebusinessdata/<string:user_id>', methods= ['GET'])
def generate_business_data(user_id):
    try:
        business_id_recommended_two = get_recommendation_list(user_id)
        return response_with(resp.SUCCESS_200, value={"business_data": get_recommendation_json(business_id_recommended_two)})
    except Exception:
        return response_with(resp.INVALID_INPUT_422)

def __getPrediction():
    svdpp = joblib.load(Keys.PKL_DIR); #need to put ENTIRE filepath here (e.g. /Users/name/.../src/svdpp_las_vegas_existing_user_model.pkl)
    predictions_svdpp = svdpp.predict('3nDUQBjKyVor5wV0reJChg', '6fPQJq4f_yiq1NHn0fd11Q')
    return predictions_svdpp

def get_business(business_id):  #calling Yelp endpoint to get business data from business ID
    business_path = Keys.BUSINESS_PATH + business_id
    url = Keys.API_HOST + business_path
    headers = {'Authorization': f"Bearer {Keys.API_KEY}"}
    response = requests.get(url, headers=headers)
    return response.json()

def get_recommendation_list(user_id): #get list of recommendations for existing user using SVDPP
    svdpp = joblib.load(Keys.PKL_DIR) #need to put ENTIRE filepath here (e.g. /Users/name/.../src/svdpp_las_vegas_existing_user_model.pkl)
    us_restaurant_review_lasvegas_nv = pd.read_csv(Keys.CSV_DIR) #need to put ENTIRE filepath here (e.g. /Users/name/.../src/us_restaurant_review_lasvegas_nv.csv)
    business_ids = us_restaurant_review_lasvegas_nv['business_id'].unique()
    business_ids_rated_by_user = us_restaurant_review_lasvegas_nv.loc[us_restaurant_review_lasvegas_nv['user_id'] == user_id, 'business_id']
    business_ids_to_predict = np.setdiff1d(business_ids, business_ids_rated_by_user)
    testset = [[user_id, business_id, 4.] for business_id in business_ids_to_predict]
    predictions_testset = svdpp.test(testset)
    predicted_ratings = np.array([pred.est for pred in predictions_testset])
    index_max_pred_rating = np.argpartition(predicted_ratings,-30)[-30:]
    business_id_recommended = business_ids_to_predict[index_max_pred_rating]
    business_id_recommended_two = business_id_recommended.tolist()
    return business_id_recommended_two

def get_recommendation_json(business_id_recommended_two):
    list_of_business_jsons = []
    count = 0
    for i in range(0, 3): #using multiple loops to maximize chance that Yelp API does not skip calls (doing 3 at a time)
        k = urllib.parse.quote(business_id_recommended_two[i].encode('utf-8'))
        list_of_business_jsons.append(get_business(k))
    for i in range(3, 6):
        k = urllib.parse.quote(business_id_recommended_two[i].encode('utf-8'))
        list_of_business_jsons.append(get_business(k))
    for i in range(6,9):
        k = urllib.parse.quote(business_id_recommended_two[i].encode('utf-8'))
        list_of_business_jsons.append(get_business(k))
    for i in range(9,12):
        k = urllib.parse.quote(business_id_recommended_two[i].encode('utf-8'))
        list_of_business_jsons.append(get_business(k))
    for i in range(12,15):
        k = urllib.parse.quote(business_id_recommended_two[i].encode('utf-8'))
        list_of_business_jsons.append(get_business(k))
    for i in range(15, 18):
        k = urllib.parse.quote(business_id_recommended_two[i].encode('utf-8'))
        list_of_business_jsons.append(get_business(k))
    for i in range(18, 21):
        k = urllib.parse.quote(business_id_recommended_two[i].encode('utf-8'))
        list_of_business_jsons.append(get_business(k))
    for i in range(21, 24):
        k = urllib.parse.quote(business_id_recommended_two[i].encode('utf-8'))
        list_of_business_jsons.append(get_business(k))
    for i in range(24, 27):
        k = urllib.parse.quote(business_id_recommended_two[i].encode('utf-8'))
        list_of_business_jsons.append(get_business(k))
    for i in range(27, 30):
        k = urllib.parse.quote(business_id_recommended_two[i].encode('utf-8'))
        list_of_business_jsons.append(get_business(k))
    return get_business_attributes(list_of_business_jsons)

def get_business_attributes(list_of_jsons): #given a list of json's, sanitize jsons for only necessary attributes and return updated list of jsons
    ls = []
    for p in list_of_jsons:
        delete_invalid_json = False #boolean flag to set true/false if json is invalid or not
        dictionary_of_json = collections.defaultdict(dict)
        if isValid(p, 'name'):
            dictionary_of_json['name'] = p.get('name')
        else:
            delete_invalid_json = True
            continue
        if isValid(p, 'display_phone'):
            dictionary_of_json['display_phone'] = p.get('display_phone')
        else:
            delete_invalid_json = True
            continue
        if isValid(p, 'rating'):
            dictionary_of_json['rating'] = p.get('rating')
        else:
            delete_invalid_json = True
            continue
        if isValid(p, 'location'):
            dictionary_of_json['location']['address1'] = p.get('location')['display_address'][0]
            dictionary_of_json['location']['city'] = p.get('location')['city']
            dictionary_of_json['location']['state'] = p.get('location')['state']
            dictionary_of_json['location']['zip_code'] = p.get('location')['zip_code']
        else:
            delete_invalid_json = True
            continue
        if isValid(p, 'url'):
            dictionary_of_json['url'] = p.get('url')
        else:
            delete_invalid_json = True
            continue
        if isValid(p, 'name'):
            dictionary_of_json['name'] = p.get('name')
        else:
            delete_invalid_json = True
            continue
        if isValid(p, 'image_url'):
            dictionary_of_json['image_url'] = p.get('image_url')
        else:
            delete_invalid_json = True
            continue
        if isValid(p, 'price'):
            dictionary_of_json['price'] = p.get('price')
        else:
            delete_invalid_json = True
            continue
        if isValid(p, 'coordinates'):
            dictionary_of_json['coordinates']['latitude'] = p.get('coordinates')['latitude']
            dictionary_of_json['coordinates']['longitude'] = p.get('coordinates')['longitude']
        else:
            delete_invalid_json = True
            continue
        if delete_invalid_json == False: #append json to list if all attributes are valid
            dictionary_updated = dict(dictionary_of_json)
            ls.append(dictionary_updated)
    return ls

def isValid(json_object, property): #helper function to validate attributes in json
    if (json_object.get(property)) is not None:
        return True
    else:
        return False

            #ls = p.get('location')['display_address'][0: len(p.get('location')['display_address'])]
            #listToStr = ' '.join(map(str, ls))->might be useful
