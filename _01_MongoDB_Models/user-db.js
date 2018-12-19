/*
    Skrypt tworzacy model uzytkownika zapisywany w bazie mongodb wykorzystujacy:
    - mongoose i mongoose.Schema w celu zapewnienia kompatybilnosci z baza MongoDB
    - modul crypto - modul wbudowany w Node.js, ktory posiada metody pomocne przy definicji pol [hashSupportCode] i [hashCode]
       * [hashSupportCode] - jest to ciag znakow generowany losowo dla kazdego uzytkownika
       * [hashCode] - jest to ciag znakow, ktory powstanie w wyniku polaczenia pol [password] i [hashSupportCode]
    - modul jsonwebtoken - modul generujacy token dla uzytkownika, ktory bedzie pozniej uzywany przy walidacji operacji dokonywanych przez uzytkownika
*/
const mongoose = require('mongoose');  
const Schema = mongoose.Schema;
const crypto = require('crypto');      
const jwt = require('jsonwebtoken');

let mdbUser = new Schema(
    {
        login:           String,
        password:        String,
        email:           String,
        registered:      Date,
        hashSupportCode: String,
        hashCode:        String
    });


// Metoda szyfrujaca haslo i wynik ten bedzie zapisywany w bazie
mdbUser.methods.cryptPassword = function(password)
{
    // Generujemy losowy ciag znakow
    this.hashSupportCode = crypto.randomBytes(16).toString('hex');

    // Ustawiamy hash, ktory bedzie wykorzystywany przy autoryzacji uzytkownika
    this.hashCode = crypto.pbkdf2Sync(password, this.hashSupportCode, 1000, 64, 'sha512').toString('hex');
}

// Metoda walidujaca haslo
mdbUser.methods.validatePassword = function(password)
{
    // Obliczamy hashCode dla podanych danych
    var hashCodeToBeChecked = crypto.pbkdf2Sync(password, this.hashSupportCode, 1000, 64, 'sha512').toString('hex');

    return this.hashCode === hashCodeToBeChecked;
}

// Generowanie JWT
mdbUser.methods.calculateJWT = function()
{
    var expirationTime = new Date()
    expirationTime.setDate(expirationTime.getDate() + 30)

    return jwt.sign(
        {
            _id:     this.id,
            login:   this.login,
            expTime: parseInt(expirationTime.getTime() / 1000)
        }, "secret");
}

module.exports = mongoose.model('mdbUser', mdbUser);