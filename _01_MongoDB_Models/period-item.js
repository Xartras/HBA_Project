// MongoDB model dla okresow rozliczeniowych

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definicja modelu i kolekcji
let dbPeriod = new Schema(
{
    _id:         { type: String },
    periodFrom:  { type: String },
    periodUntil: { type: String },
    user:        { type: String }
},
{
    collection: 'Periods'
});

module.exports = mongoose.model('dbPeriod', dbPeriod);