const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// item model
const Item = require('../../models/Item');

// @ route GEt api/items
// @desc Get all Items
// @access Piblic

// "/" means "api/items/"
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

// post an item
// @access Private
router.post('/', auth, (req, res) => {
const newItem = new Item({
    name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

//this function has not been implement
// delete a item
// @access Private
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({remove: true})))
        .catch(err => res.status(404).json({remove: false}));
});


module.exports = router;