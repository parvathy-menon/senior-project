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


# Backend installation

# path udpate
1. put svdpp_las_vegas_existing_user_model.pkl and us_restaurant_review_lasvegas_nv.csv in the backend root
2. in the src/api/utils/keys.py file, update the file path for above files

# run below code in backend root directory to intall and run the backend
1. pip install virtualenv
2. virtualenv venv
3. source venv/bin/activate
4. pip install -r requirements.txt
5. cd src
6. python run.py
