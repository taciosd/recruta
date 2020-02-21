const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: String,
    email: String,
    cpf: String,
    linkedin_url: String,
    curriculum_content: String,
 });

 module.exports = mongoose.model('Candidate', candidateSchema);