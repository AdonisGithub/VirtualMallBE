const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let user = new Schema({

    fullName: {
        type: String
    },
    lastName: {
        type: String
    },
    userName: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: {
      type: String
    },
    password: {
      type: String
    },
});

module.exports = mongoose.model('User', user);
