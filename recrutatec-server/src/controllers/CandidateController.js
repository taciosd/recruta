const axios = require('axios');
//const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const Candidate = require('../models/Candidate');

module.exports = {

    async loginWithLinkedIn(req, res) {
        const clientId = '77zn01e6hz43ee';
        const authResponse = await axios.get(`https://www.linkedin.com/oauth/v2/authorization?format=json&response_type=code&client_id=${clientId}&redirect_uri=http://localhost:3000/candidates/linkedin/callback&state=fooobar&scope=r_liteprofile%20r_emailaddress%20w_member_social`);
        return res.json(authResponse.data);
    },

    async index(req, res) {
        const candidates = await Candidate.find();
        res.json(candidates);
    },

    async get(req, res) {
        const id = req.param('id');
        const candidate = await Candidate.findById(id);
        res.json(candidate);
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