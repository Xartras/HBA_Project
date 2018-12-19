// MongoDB model dla oplat okresowych

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definicja modelu i kolekcji
let dbPeriodicFeesItem = new Schema(
{
    category:        { type: String },
    name:            { type: String },
    paidUntil:       { type: String },         
    paymentPeriod:   { type: String },
    paymentDeadline: { type: String },
    warnings:        { type: String },
    actions:         { type: String }
},
{
    collection: 'PeriodicFees'
});

module.exports = mongoose.model('dbPeriodicFeesItem', dbPeriodicFeesItem);