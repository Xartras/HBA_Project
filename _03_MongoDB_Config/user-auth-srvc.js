/*
    Skrypt odpowiedzialny za autoryzacje uzytkownika w przypadku rejesrtacji/logowania
*/

var passport = require('passport');
var mongoose = require('mongoose');
var User     = require('../_01_MongoDB_Models/user-db');

// Rejestracja
module.exports.userRegistration = function(userToBeRegistered, result)
{
    var user = new User();

    user.login      = userToBeRegistered.body.login;
    user.email      = userToBeRegistered.body.email;
    user.registered = userToBeRegistered.body.registered;
    user.cryptPassword(userToBeRegistered.body.password)


    user.save(function(error)
    {
        var token = user.calculateJWT();
        result.status(200);
        result.json( { "token": token } )
    })
}


// Logowanie
module.exports.userLoggingIn = function(userToBeLoggedIn, result)
{
    var token;
    
    passport.authenticate('local', function(error, user, information)
    {
        // Przerywamy dzialanie w wyniku pojawienia sie bledu
        if(error) { result.status(404).json(error); return; }

        // Jesli nie znajdziemy uzytkownika
        if(!user) 
        {
            result.status(401).json(information) 
        }
        else
        {
            token = user.calculateJWT();
            result.status(200);
            result.json( { "token": token } )
        }
    })(userToBeLoggedIn, result);
}