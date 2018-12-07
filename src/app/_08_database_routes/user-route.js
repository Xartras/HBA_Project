// Skrypt odpowiedzialny za operacje na danych uzytkownikow w bazie mongodb

const express = require('express');
const app = express();
const dbUserRoutes = express.Router();

// Ustawiamy wymagany model uzytkownika
let dbUsr = require('../_07_database_models/user-db')


// Dodawanie uzytkownika
dbUserRoutes.route('/add').post(function (req, res) 
{
  let userDB = new dbUsr(req.body);
  userDB.save()
    .then(savedUser =>  { res.status(200).json({'userDB': 'User added successfully'}); })
    .catch(err => { res.status(400).send("unable to save to database"); });
});
  
// Pobieranie danych uzytkownika
dbUserRoutes.route('/').get(function (req, res) 
{
    dbUsr.find(function (err, foundUser)
  {
    if(err)
        { console.log(err); }
    else 
        { res.json(foundUser); }
  });
});

module.exports = dbUserRoutes;