// Skrypt tworzacy model uzytkownika zapisywany w bazie mongodb

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserDB = new Schema(
    {
        login:        { type: String },
        password:     { type: String },
        email:        { type: String },
        registered:   { type: Date }

    },
    {
        collection: 'RegisteredUsers'
    });

module.exports = mongoose.model('newUser', UserDB);