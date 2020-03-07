const Company = require('./../models/Company');

module.exports = {

    async get(req, res) {
        const company = await Company.findOne();
        res.json(company);
    },

    async store(req, res) {
        const companyTemplate = req.body;
        const savedCompany = await Company.findOneAndUpdate(
            {}, 
            companyTemplate, 
            {
                upsert: true, 
                setDefaultsOnInsert: true,
                new: true
            }
        );
        res.json(savedCompany);
    },
};