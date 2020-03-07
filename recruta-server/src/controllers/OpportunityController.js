const Opportunity = require('../models/Opportunity');

module.exports = {

    async index(req, res) {
        const opportunities = await Opportunity.find()
        .catch(e => {
            console.log('Error getting opportunities list');
        });
        res.json(opportunities);
    },

    async get(req, res) {
    },

    async store(req, res) {
        const opportunityTemplate = req.body;
        const savedOpportunity = await Opportunity.create(opportunityTemplate);
        res.json(savedOpportunity);
    },
    
    async update(req, res) {
    },
};