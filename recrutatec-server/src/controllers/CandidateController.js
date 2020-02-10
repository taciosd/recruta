const axios = require('axios');
const Candidate = require('../models/Candidate');

module.exports = {

    async index(req, res) {
        const candidates = await Candidate.find();
        res.json(candidates);
    },

    async store(req, res) {
        const candidateTemplate = req.body;
        const savedCandidate = await Candidate.create(candidateTemplate);
        res.json(savedCandidate);
    },

    async update(req, res) {
        const id = req.params.id;
        const candidateTemplate = req.body;
        const savedCandidate = 
                await Candidate.findOneAndUpdate(
                    {_id: id}, 
                    candidateTemplate, 
                    {
                        new: true
                    }
                );

        res.json(savedCandidate);
    },
};