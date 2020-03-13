const Opportunity = require('../models/Opportunity');

module.exports = {

    async index(req, res) {
        const opportunities = await Opportunity.find()
        .catch(e => {
            console.log(e);
        });

        const groups = Opportunity.schema.statics.Groups;
        res.json({
            opportunities,
            groups
        });
    },

    async get(req, res) {
        const id = req.params.id;
        const opportunity = await Opportunity.findById(id);
        const groups = Opportunity.schema.statics.Groups;
        res.json({
            opportunity,
            groups
        });
    },

    async store(req, res) {
        const opportunityTemplate = req.body;
        const savedOpportunity = 
            await Opportunity.create(opportunityTemplate)
            .catch(e => {
                console.log(e);
                res.status(400).send('Error while saving new opportunity.');
                return;
            });
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
            )
            .catch(e => {
                console.log(e);
                res.status(400).send('Error while updating opportunity.');
                return;
            });

        res.json(savedOpportunity);
    },
};