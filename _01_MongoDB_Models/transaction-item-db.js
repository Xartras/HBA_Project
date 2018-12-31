// MongoDB model dla pojedynczego wpisu do transakcji

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definicja modelu i kolekcji
let dbTransactionItem = new Schema(
{
    _id :        { type: String },
    type:        { type: String },
    subType:     { type: String },
    category:    { type: String },
    name:        { type: String },
    amount:      { type: Number },
    description: { type: String },
    accounted:   { type: Date },
    entered:     { type: Date },
    period:      { type: String },
    comment:     { type: String },
    user:        { type: String }
},
{
    collection: 'Transactions'
});

module.exports = mongoose.model('dbTransactionItem', dbTransactionItem);