# senior-project front-end
Senior Project Repository

# install and start
1. After you clone, use “npm run client-install” and "npm install" to do all dependency install.
2. use “npm run dev” to run the front-end and front-end server.

# monogoDB information
web login: https://cloud.mongodb.com/user#/atlas/login
Login username: yunjunma@gmail.com
password:  SeSp195b!

# Yelp API Key
REACT_APP_API_KEY = dn1j4olzNIiHc9SWJmYhRHLR1ytzLQrVc-B0P-kcPzECXQaisAknSQeq70Gnxj2DoLhWwfTnN1YNWDA89bRWbtogs_qvN_gpK8qvvZqPelpOWiUCUg6UZE0SkatsXXYx

# Mongo_URI for node.js
MONGO_URI = mongodb+srv://yunjunma:yunjunma@cluster0-jljac.mongodb.net/test?retryWrites=true&w=majority

# Usage of Preference API example
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
