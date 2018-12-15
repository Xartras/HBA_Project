/*
    Skrypt wspierajacy walidacje danych przez server Express
*/

var pssprt   = require('passport');
var locStrtg = require('passport-local').Strategy;
var moongose = requre('moongose');
var User     = moongose.model.User

/* 
    Walidacja przy uzyciu tego modulu wymaga podania pol "username" i "password".
    W projekcie wykorzystywane bedzie pole 'login' i zmiana tego ustawienia zostala zapisana ponizej
*/
pssprt.use( 
            new locStrtg( { usernameField: 'login' },
            function(log, pss, result)
            {
                // Szukamy uzytkownika o podanym loginie
                User.findOne( { login: log },
                function(error, usr)
                {
                    // Zwracamy blad (jesli wystapil)
                    if(error) { return result(error) };

                    // Brak uzytkownika w bazie
                    if(!usr) { return result(null, false, {msg: "Użytkownik nie istnieje!"}) }

                    // Zle haslo
                    if(!usr.validatePassword(pss)) { return result(null, false, {msg: "Podano złe hasło!"}) }

                    // Dane poprawne
                    return result(null, usr);
                });
            }) 
           )