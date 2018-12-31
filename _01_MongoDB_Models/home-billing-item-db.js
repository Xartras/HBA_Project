// MongoDB model dla zuzycia zasobow

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definicja modelu i kolekcji
let dbResourceItem= new Schema(
{
    _id :     { type: String },
    name:     { type: String },
    period:   { type: String },
    quantity: { type: String },
    comment:  { type: String },
    user:     { type: String }
},
{
    collection: 'Resources'
});

module.exports = mongoose.model('dbResourceItem', dbResourceItem);