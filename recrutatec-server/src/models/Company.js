const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    _id: {
        type: Number,
        default: 1,
    },
    name: String,
    welcomeTitle: String,
    welcomeContent: String,
 });

 module.exports = mongoose.model('Company', companySchema);