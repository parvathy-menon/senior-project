const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
var ObjectId = require('mongodb').ObjectId;

// preference model
const Preference = require('../../models/Preference');

// @ route GEt api/items
// @desc Get all Items
// @access Piblic // should be private in the future

// access format => http://localhost:5000/api/preferences/5d9fdb2635ba2a3c968a0741
// no authendication function yet, may need it in the future.
router.get('/:id', (req, res) => {
    var userID = req.params.id
    // var userID = "5d7aca48b5fbaa050e6f5ee1"
    var o_id = new ObjectId(userID);
    Preference.find({ _id: o_id })
        .then(preference => res.json(preference))
});

// post an preference
// shoud be @access Private in the future

// uncommnent below line to open the authendication function
// router.post('/', auth, (req, res) => {
router.post('/:id', (req, res) => {
    console.log("I was here");
    var userID = req.params.id;
    var o_id = new ObjectId(userID);
    Preference.findOne({ _id: o_id })
        .then(preference => {
            console.log("I was here");
            // if the preference of an user has existed
            // update the existing document
            if (preference) {
                preference.likes_mexican = req.body.likes_mexican;
                preference.likes_chinese = req.body.likes_chinese;
                preference.likes_american = req.body.likes_american;
                preference.likes_vietnamese = req.body.likes_vietnamese;

                preference.save().then(preference => res.json(preference));
            } else {
                // if the user's preference is not existed
                // create a new document
                const newPreference = new Preference({
                    _id: o_id,
                    likes_mexican: req.body.likes_mexican,
                    likes_chinese: req.body.likes_chinese,
                    likes_american: req.body.likes_american,
                    likes_vietnamese: req.body.likes_vietnamese
                });

                newPreference.save().then(preference => res.json(preference));
            }
        })
});

module.exports = router;
