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
        const id = req.params.id;
        const opportunity = await Opportunity.findById(id);
        res.json(opportunity);
    },

    async store(req, res) {
        const opportunityTemplate = req.body;
        const savedOpportunity = await Opportunity.create(opportunityTemplate);
        res.json(savedOpportunity);
    },
    
    async update(req, res) {
        const id = req.params.id;
        const opportunityTemplate = req.body;
        const savedOpportunity = 
            await Opportunity.findOneAndUpdate(
                {_id: id}, 
                opportunityTemplate, 
                {
                    new: true
                }
            );

        res.json(savedOpportunity);
    },
};