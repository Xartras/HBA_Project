// MongoDB model dla planu oszczednosciowego

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definicja modelu i kolekcji
let dbSavingPlanItem = new Schema(
{
    _id:           { type: String },
    target:        { type: String },
    plannedAmount: { type: Number },
    currentAmount: { type: Number },
    getUntil:      { type: String },
    comment:       { type: String },
    user:          { type: String }
},
{
    collection: 'SavingPlan'
});

module.exports = mongoose.model('dbSavingPlanItem', dbSavingPlanItem);