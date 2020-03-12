const mongoose = require('mongoose');

const Groups = Object.freeze({
    HR: 'Recursos Humanos',
    TechSupport: 'Suporte técnico',
    Engineer: 'Engenharia',
  });

const opportunitySchema = new mongoose.Schema({
    title: String,
    description: String,
    group: {
        type: String,
        enum: Object.values(Groups),
    },
    tags: [String],
 });

 Object.assign(opportunitySchema.statics, {
   Groups
 });

 module.exports = mongoose.model('Opportunity', opportunitySchema);