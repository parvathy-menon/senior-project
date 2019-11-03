const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// item model
const User = require('../../models/User');

// @ route  GEt api/users
// @desc    Register new user
// @access  Piblic

// "/" means "api/items/"
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