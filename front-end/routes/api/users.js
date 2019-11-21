const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectId;

// item model
const User = require('../../models/User');

// @ route  GET api/users
// @desc    Get the uID to determine wether an existing user or a new user, a new user is empty in the uID field
// @access  Piblic

// router.get('/', (req, res) => {
//     var userID = req.body._id;
//     var o_id = new ObjectId(userID);
//     User.findOne({ _id: o_id })
//         .then(user => res.json(user));
//     // .then(user => {
//     //     // not sure why only not return uid // have to return the whole object,sorry
//     //     res.json({ uid: user[0].uid })
//     // });

// });
router.get('/:id', (req, res) => {
    var userID = req.params.id;
    var o_id = new ObjectId(userID);
    User.findOne({ _id: o_id })
        .then(user => res.json(user));
    // .then(user => {
    //     // not sure why only not return uid // have to return the whole object,sorry
    //     res.json({ uid: user[0].uid })
    // });

});

// @ route  POST api/users
// @desc    Register new user
// @access  Piblic

// "/" means "/api/users"
router.post('/', (req, res) => {
    const { name, password } = req.body;

    // simple validation
    if (!name || !password) {
        return res.status(400).json({ msg: 'Please enter all  fields.' });
    }

    // check for existing user
    User.findOne({ name })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User name already exists.' });

            const newUser = new User({
                name,
                password
            });

            // create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                // good for 24 hours
                                { expiresIn: 3600 * 24 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name
                                        }
                                    })
                                });
                        }
                        )
                })
            })
        })
});

module.exports = router;