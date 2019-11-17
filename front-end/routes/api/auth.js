const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// item model
const User = require('../../models/User');

// @ route  Post api/auth
// @desc    Auth user
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
            if (!user) return res.status(400).json({ msg: 'User does not exist.' });

            // validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid password.' });

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
                })
        })
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private

//validate the user with the token
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    // ignore the password
        .select('-password')
        .then(user => res.json(user));
});


module.exports = router;