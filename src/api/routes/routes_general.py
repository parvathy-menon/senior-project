#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import request
from api.utils.responses import response_with
from api.utils import responses as resp
from api.models.model_author import Author, AuthorSchema
from api.models.user import users
from api.models.preferences import preferences
import joblib
import pandas as pd
import numpy as np
import pymongo
from bson.objectid import ObjectId
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
        #datetime = datetime.datetime.now()
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
    print(__getPrediction()) #testing if predictions from pickle file runs
    try:
        user_id = ObjectId(user_id)
        user = preferences.objects(_id=user_id)
        return response_with(resp.SUCCESS_200, value={"preferences": user.to_json()})
    except Exception:
        return response_with(resp.INVALID_INPUT_422)

def __getPrediction():
    svdpp = joblib.load('svdpp_las_vegas_existing_user_model.pkl'); #need to put ENTIRE filepath here (e.g. /Users/name/.../src/svdpp_las_vegas_existing_user_model.pkl)
    predictions_svdpp = svdpp.predict('3nDUQBjKyVor5wV0reJChg', '6fPQJq4f_yiq1NHn0fd11Q')
    return predictions_svdpp

@route_path_general.route('/v1.0/authors', methods=['POST'])
def create_author():
    """
    Create author endpoint
    ---
    parameters:
        - in: body
          name: body
          schema:
            id: Author
            required:
                - name
                - surname
                - books
            properties:
                name:
                    type: string
                    description: First name of the author
                    default: "John"
                surname:
                    type: string
                    description: Surname of the author
                    default: "Doe"
                books:
                    type: string
                    description: Book list of author
                    type: array
                    items:
                        schema:
                            id: BookSchema
                            properties:
                                title:
                                    type: string
                                    default: "My First Book"
                                year:
                                    type: date
                                    default: "1989-01-01"
    responses:
            200:
                description: Author successfully created
                schema:
                  id: AuthorCreated
                  properties:
                    code:
                      type: string
                    message:
                      type: string
                    value:
                      schema:
                        id: AuthorFull
                        properties:
                            name:
                                type: string
                            surname:
                                type: string
                            books:
                                type: array
                                items:
                                    schema:
                                        id: BookSchema
            422:
                description: Invalid input arguments
                schema:
                    id: invalidInput
                    properties:
                        code:
                            type: string
                        message:
                            type: string
    """
    try:
        data = request.get_json()
        author_schema = AuthorSchema()
        author, error = author_schema.load(data)
        result = author_schema.dump(author.create()).data
        return response_with(resp.SUCCESS_200, value={"author": result})
    except Exception:
        return response_with(resp.INVALID_INPUT_422)


@route_path_general.route('/v1.0/authors', methods=['GET'])
def get_author_list():
    """
    Get author list
    ---
    responses:
            200:
                description: Returns author list
                schema:
                  id: AuthorList
                  properties:
                    code:
                      type: string
                    message:
                      type: string
                    authors:
                        type: array
                        items:
                            schema:
                                id: AuthorSummary
                                properties:
                                    name:
                                        type: string
                                    surname:
                                        type: string
    """
    fetched = Author.query.all()
    author_schema = AuthorSchema(many=True, only=['name', 'surname'])
    authors, error = author_schema.dump(fetched)
    return response_with(resp.SUCCESS_200, value={"authors": authors})


@route_path_general.route('/v1.0/authors/<int:author_id>', methods=['GET'])
def get_author_detail(author_id):
    """
    Get author detail
    ---
    parameters:
        - name: author_id
          in: path
          description: ID of the author
          required: true
          schema:
            type: integer

    responses:
            200:
                description: Returns author detail
                schema:
                  id: AuthorList
                  properties:
                    code:
                      type: string
                    message:
                      type: string
                    author:
                        id: AuthorFull
                        properties:
                            name:
                                type: string
                            surname:
                                type: string
                            books:
                                type: array
                                items:
                                    schema:
                                        id: BookSchema
                                        properties:
                                            title:
                                                type: string
                                            year:
                                                type: date
    """
    fetched = Author.query.filter_by(id=author_id).first()
    author_schema = AuthorSchema()
    author, error = author_schema.dump(fetched)
    return response_with(resp.SUCCESS_200, value={"author": author})
