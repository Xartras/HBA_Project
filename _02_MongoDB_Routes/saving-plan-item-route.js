// Routing do bazy dla planu budzetowego

const express = require('express');
const app = express();
const dbSavingPlanRouter = express.Router();

// Ustawienie wymagalnosci modelu
let dbSavingPlan = require('../_01_MongoDB_Models/saving-plan-item-db');


// Pobranie danych
dbSavingPlanRouter.route('/').get(function (item, result) 
{
    dbSavingPlan.find(function (error, savingPlan)
    {
        if(error) { console.log(error); }
        else      { result.json(savingPlan); }
    });
});

// Dodawanie nowego planu
dbSavingPlanRouter.route('/add').post(function (item, result) 
{
  let savingPlanItem = new dbSavingPlan(item.body);
  savingPlanItem.save()
    .then(game => { result.status(200).json({'savingPlan': 'Dodano'}); })
    .catch(err => { result.status(400).send("Nie udalo sie"); });
});

// Usuniecie planu budzetowego
dbSavingPlanRouter.route('/delete/:id').get(function (item, result) 
{
    dbSavingPlan.findByIdAndRemove({_id: item.params.id}, function(error, savingPlanItem)
    {
        if(error) result.json(error);
        else result.json('Usunieto');
    });
});

module.exports = dbSavingPlanRouter;