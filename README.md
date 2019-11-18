# flask-api-starter

[![Build Status](https://travis-ci.org/cdagli/flask-api-starter.svg?branch=master)](https://travis-ci.org/cdagli/flask-api-starter)

This project provides a boilerplate for building a Rest API using flask.

Other modules used are listed below; 
- sqlalchemy
- marshmallow
- sqlalchemy marshmallow
- flask sqlalchemy
- flask swagger

![alt text][screenshot]

[screenshot]: https://github.com/cdagli/flask-api-starter/blob/master/swagger.png
_*swagger documentation visualized with Swagger UI Console [Chrome extension](https://chrome.google.com/webstore/detail/swagger-ui-console/ljlmonadebogfjabhkppkoohjkjclfai)_

###To run locally:

```
git clone https://github.com/cdagli/flask-api-starter
cd flask-api-starter
virtualenv venv
source venv/bin/activate
cd src
pip install -r requirements.txt
python -m run 
```

Run tests:
```
nose2 -v
```

###Using Docker
Build with docker: 
```
git clone https://github.com/cdagli/flask-api-starter
cd flask-api-starter/src
docker build -t flask-api-starter .
```

Run in development mode: 
```
docker run -dt --name=flask-api-starter -v $PWD:/app -p 5000:5000 -e 'WORK_ENV=DEV' flask-api-starter
```

Run in production mode:
```
docker run -dt --restart=always --name=flask-api-starter -p 5000:5000 -e 'WORK_ENV=PROD' flask-api-starter
```

Remove the container:
```
docker rm -f flask-api-starter
```

To see logs and connect the container:
```
docker logs --follow flask-api-starter
docker exec -it flask-api-starter bash

```

# senior-project front-end
Senior Project Repository

# install and start
1. After you clone, use “npm run client-install” and "npm install" to do all dependency install.
2. use “npm run dev” to run the front-end and front-end server.

# Mongo_URI for node.js
MONGO_URI = mongodb+srv://yunjunma:yunjunma@cluster0-jljac.mongodb.net/test?retryWrites=true&w=majority

# Usage of Preference API "Post" example
1. post address: http://localhost:5000/api/preferences/5d9fdb2635ba2a3c968a0741
2. body, raw, JSON
    {
      "likes_mexican" : false,
      "likes_chinese" : true,
      "likes_american" : true,
      "likes_vietnamese" : false
    }
3. header
  Key           Valve
  Content-Type: application/json
4. response
  {
    "_id": "5d9fdb2635ba2a3c968a0741",
    "likes_mexican": false,
    "likes_chinese": true,
    "likes_american": true,
    "likes_vietnamese": false,
    "_v": 0
  }

# Usage of Preference API "Get" example
1. address: 
    http://localhost:5000/api/preferences/5d9fdb2635ba2a3c968a0741
2. response: 
  [{"_id":"5d9fdb2635ba2a3c968a0741","likes_mexican":false,"likes_chinese":true,"likes_american":true,"likes_vietnamese":false,"__v":0}]
