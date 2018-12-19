// MongoDB model dla planu budzetowego

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definicja modelu i kolekcji
let dbBudgetPlanItem = new Schema(
{
    _id :     { type: String },
    type:     { type: String },
    category: { type: String },
    name:     { type: String },
    period:   { type: String },
    amount:   { type: Number },
    comment:  { type: String },
    actions:  { type: String }
},
{
    collection: 'BudgetPlan'
});

module.exports = mongoose.model('dbBudgetPlanItem', dbBudgetPlanItem);