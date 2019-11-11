#!/usr/bin/python
# -*- coding: utf-8 -*-

from api.utils.factory import create_app
from api.utils.config import DevelopmentConfig, ProductionConfig
from flask import Flask
from flask_cors import CORS, cross_origin
import os
app = Flask(__name__)
cors = CORS(app, support_credentials=True)

if __name__ == '__main__':
    if os.environ.get('WORK_ENV') == 'PROD':
        app = create_app(ProductionConfig)
        app.run(port=5000, host="0.0.0.0", use_reloader=False)
    else:
        app = create_app(DevelopmentConfig)
        app.run(port=5000, host="0.0.0.0", use_reloader=True)
