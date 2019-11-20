# senior-project
Senior Project Repository

# install and start front-end
1. After you clone, use “npm run client-install” and "npm install" to do all dependency install.
2. use “npm run dev” to run the front-end and front-end server.

# install and start back-end
1. Make sure you have Python 3.7 installed. If you do not, make sure to download and install Python 3.7 on your system.
2. Run `pip install virtualenv` to install the virtual environment for Flask.
3. Run `virtual venv` to create a virtual environment.
4. To activate the virtual environment, do `source venv/bin/activate`.
5. To install all the necessary Python packages necessary to make this project run, navigate to the `src` folder by doing `cd src` and do `pip install -r requirements.txt`.
6. To start the back-end, run the Flask server by entering `python run.py`.


# monogoDB information
web login: https://cloud.mongodb.com/user#/atlas/login
Login username: yunjunma@gmail.com
password:  SeSp195b!

# Yelp API Key
REACT_APP_API_KEY = dn1j4olzNIiHc9SWJmYhRHLR1ytzLQrVc-B0P-kcPzECXQaisAknSQeq70Gnxj2DoLhWwfTnN1YNWDA89bRWbtogs_qvN_gpK8qvvZqPelpOWiUCUg6UZE0SkatsXXYx

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
  
# Machine Learning Branches - dev-preprocess, dev-recommender, dev-connect
1. Git pull the .ipynb files (Jupyter Notebook files)
2. Download Jupyter Notebook (https://jupyter.org/install) and Anaconda (https://www.anaconda.com/distribution/)
3. Launch Jupyter Notebook application after installation.
4. Jupyter Notebook will be opened in a browser. Use the browser GUI to browse through your directories to find the location of the      .pynb files, and click to open.
5. Run the code cells in the Jupyter Notebook. If any errors occur due to uninstalled dependency packages, open Anaconda prompt to install dependencies.
