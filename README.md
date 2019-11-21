# senior-project
Senior Project Repository

# install and start front-end
1. After you clone, in the front-end directory, use `npm run client-install` and `npm install` to do all dependency install.
2. use `npm run dev` to run the front-end and front-end express server.

# install and start back-end
1. Make sure you have Python 3.7 installed. If you do not, make sure to download and install Python 3.7 on your system.
2. Run `pip install virtualenv` to install the virtual environment for Flask. (If `pip` does not work for you, try `pip3`. Depending on how your system is set up, `pip` and `python` may be automatically configured for Python 2, while `python3` and `pip3` could be configured for Python 3. But make sure you are using Python 3 in all cases. You can verify this by doing `python --version` or `python3 --version`).
3. Run `virtual venv` to create a virtual environment.
4. To activate the virtual environment, do `source venv/bin/activate`.
5. To install all the necessary Python packages necessary to make this project run, navigate to the `src` folder by doing `cd src` and do `pip install -r requirements.txt`.
6. Download this file on your system and put it in your `src` folder: https://drive.google.com/file/d/1DAeITx02hzHCJUF0spo0-BgAQcvOPJVB/view.
7. Some of the endpoints in the backend need to connect to files with a complete path in it. So, navigate to the filepaths in a file that contains all the filepaths in `src/api/utils/keys.py`. 
8. For lines 5-7 of keys.py, update the filepaths for each of those files to your own complete filepaths (e.g. `Users/<yourname>/<one of Desktop,Documents, etc.>/.../src/svdpp_las_vegas_existing_user_model.pkl` for the pkl file on line 5. Do the same for lines 6 and 7 for the CSV files).
9. To start the back-end, navigate back to the `src` folder and run the Flask server by entering `python run.py`.

# update keys file
Some of the endpoints in the backend require direct access to files with a direct path. This requires to update "src/api/utils/keys.py" with the following values.

`API_KEY = 'dn1j4olzNIiHc9SWJmYhRHLR1ytzLQrVc-B0P-kcPzECXQaisAknSQeq70Gnxj2DoLhWwfTnN1YNWDA89bRWbtogs_qvN_gpK8qvvZqPelpOWiUCUg6UZE0SkatsXXYx'`
`API_HOST = 'https://api.yelp.com'`
`BUSINESS_PATH = '/v3/businesses/'`

The remaining keys, `PKL_DIR`, `CSV_DIR`, and `FEATURES_DIR` will require the file directory of certain files. e.g.

`PKL_DIR = '/Users/parvathy/Desktop/senior-project/src/svdpp_las_vegas_existing_user_model.pkl'` (should contain file path of pkl file).

`CSV_DIR = "/Users/parvathy/Desktop/senior-project/src/us_restaurant_review_lasvegas_nv.csv"` (should contain file path of us_restaurant_review_lasvegas_nv.csv)

`FEATURES_DIR = "/Users/parvathy/Desktop/senior-project/src/restaurant_features.csv"` (should contain file path of restaurant_features.csv)

Populate the keys with appropriate file paths.

# Yelp API Key
`REACT_APP_API_KEY = dn1j4olzNIiHc9SWJmYhRHLR1ytzLQrVc-B0P-kcPzECXQaisAknSQeq70Gnxj2DoLhWwfTnN1YNWDA89bRWbtogs_qvN_gpK8qvvZqPelpOWiUCUg6UZE0SkatsXXYx`

# Mongo_URI for node.js
`MONGO_URI = mongodb+srv://yunjunma:yunjunma@cluster0-jljac.mongodb.net/test?retryWrites=true&w=majority`

# Usage of Preference API "Post" example
1. post address: `http://localhost:5000/api/preferences/5d9fdb2635ba2a3c968a0741`
2. body, raw, JSON
```
    {
      "likes_mexican" : false,
      "likes_chinese" : true,
      "likes_american" : true,
      "likes_vietnamese" : false
    }
```
3. header
```
  Key           Valve
  Content-Type: application/json
```
4. response
```
  {
    "_id": "5d9fdb2635ba2a3c968a0741",
    "likes_mexican": false,
    "likes_chinese": true,
    "likes_american": true,
    "likes_vietnamese": false,
    "_v": 0
  }
```

# Usage of Preference API "Get" example
1. address: 
    `http://localhost:5000/api/preferences/5d9fdb2635ba2a3c968a0741`
2. response: 
```
  [{"_id":"5d9fdb2635ba2a3c968a0741","likes_mexican":false,"likes_chinese":true,"likes_american":true,"likes_vietnamese":false,"__v":0}]
```
  
# Machine Learning Branches - dev-preprocess, dev-recommender, dev-connect
1. Git pull the .ipynb files (Jupyter Notebook files)
2. Download Jupyter Notebook (https://jupyter.org/install) and Anaconda (https://www.anaconda.com/distribution/)
3. Launch Jupyter Notebook application after installation.
4. Jupyter Notebook will be opened in a browser. Use the browser GUI to browse through your directories to find the location of the      .pynb files, and click to open.
5. Run the code cells in the Jupyter Notebook. If any errors occur due to uninstalled dependency packages, open Anaconda prompt to install dependencies.
