// Routing do bazy dla zasobow

const express = require('express');
const app = express();
const dbResourcesRouter = express.Router();

// Ustawienie wymagalnosci modelu
let dbResourceItem = require('../_01_MongoDB_Models/home-billing-item-db');

// Pobranie danych
dbResourcesRouter.route('/').get(function (item, result) 
{
    dbResourceItem.find(function (error, resourceItem)
    {
        if(error) { console.log(error); }
        else      { result.json(resourceItem); }
    });
});

// Dodawanie nowego zasobu
dbResourcesRouter.route('/add').post(function (item, result) 
{
  let resourceItem = new dbResourcesRouter(item.body);
  resourceItem.save()
    .then(game => { result.status(200).json({'budgetPlan': 'Dodano'}); })
    .catch(err => { result.status(400).send("Nie udalo sie"); });
});

// Usuniecie zasobu
dbResourcesRouter.route('/delete/:id').get(function (item, result) 
{
    dbResourceItem.findByIdAndRemove({_id: item.params.id}, function(error, resourceItem)
    {
        if(error) result.json(error);
        else result.json('Usunieto');
    });
});

module.exports = dbResourcesRouter;