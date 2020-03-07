const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
    title: String,
    description: String,
    group: {
        type: String,
        enum: ['RH', 'Suporte', 'Engenharia'],
    },
    tags: [String],
 });

 module.exports = mongoose.model('Opportunity', opportunitySchema);