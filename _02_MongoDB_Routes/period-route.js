// Routing do bazy okresow rozliczeniowych

const express = require('express');
const app = express();
const dbPeriodsRouter = express.Router();

// Ustawienie wymagalnosci modelu
let dbPeriods = require('../_01_MongoDB_Models/period-item');


// Pobranie danych
dbPeriodsRouter.route('/').get(function (item, result) 
{
    dbPeriods.find(function (error, periods)
    {
        if(error) { console.log(error); }
        else      { result.json(periods); }
    });
});

// Dodanie nowego okresu
dbPeriodsRouter.route('/add').post(function (item, result) 
{
  let periodItem = new dbPeriods(item.body);
  periodItem.save()
    .then(game => { result.status(200).json({'okres': 'Dodano'}); })
    .catch(err => { result.status(400).send("Nie udalo sie"); });
});

module.exports = dbPeriodsRouter;
