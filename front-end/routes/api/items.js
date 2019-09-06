const express = require('express');
const router = express.Router();

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
router.post('/', (req, res) => {
const newItem = new Item({
    name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// delete a item
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({remove: true})))
        .catch(err => res.status(404).json({remove: false}));
});


module.exports = router;