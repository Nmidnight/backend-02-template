const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    surname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 5,
        unique: true,
    },
    borrowedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }],
});

module.exports = mongoose.model('User', userSchema);
