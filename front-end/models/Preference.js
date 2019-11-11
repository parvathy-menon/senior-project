const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PreferenceSchema = new Schema({

    likes_mexican: {
        type: Boolean,
        required: true,
    },
    likes_chinese: {
        type: Boolean,
        required: true
    },
    likes_american: {
        type: Boolean,
        required: true
    },
    likes_vietnamese: {
        type: Boolean,
        required: true
    },
    likes_creperies: {
        type: Boolean,
        required: true
    },
    likes_french: {
        type: Boolean,
        required: true
    },
    likes_thai: {
        type: Boolean,
        required: true
    },
    likes_japanese: {
        type: Boolean,
        required: true
    },
    likes_italian: {
        type: Boolean,
        required: true
    }
});

module.exports = Preference = mongoose.model('preference', PreferenceSchema);

