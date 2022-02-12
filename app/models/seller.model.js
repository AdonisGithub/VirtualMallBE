const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let seller = new Schema({

    fullName: {
        type: String
    },
    lastName: {
        type: String
    },
    companyName: {
        type: String
    },
    companyWebsite: {
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

module.exports = mongoose.model('Seller', seller);
