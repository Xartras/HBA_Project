/*
    Skrypt odpowiedzialny za autoryzacje uzytkownika w przypadku rejesrtacji/logowania
*/

var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model.User;

// Rejestracja
module.exports.userRegistration = function(userToBeRegistered, result)
{
    var user = User;

    user.login      = userToBeRegistered.body.login;
    user.email      = userToBeRegistered.body.email;
    user.registered = new Date().setDate(getDate());
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