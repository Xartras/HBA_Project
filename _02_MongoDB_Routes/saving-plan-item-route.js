// Routing do bazy dla planu budzetowego

const express = require('express');
const app = express();
const dbSavingPlanRouter = express.Router();

// Ustawienie wymagalnosci modelu
let dbSavingPlan = require('../_01_MongoDB_Models/saving-plan-item-db');


// Defined get data(index or listing) route
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


// Edycja planu budzetowego
dbSavingPlanRouter.route('/edit/:id').get(function (item, result) 
{
  let id = item.params.id;
  dbSavingPlan.findById(id, function (err, savingPlanItem) { result.json(savingPlanItem); });
});

// Aktualizacja planu budzetowego
dbSavingPlanRouter.route('/update/:id').post(function (item, result) 
{
    dbSavingPlan.findById(item.params.id, function(error, savingPlanItem) 
    {
        if (!savingPlanItem) return next(new Error('Nie udalo sie'));
        else 
        {
            savingPlanItem._id           = item.body.id;
            savingPlanItem.target        = item.body.target;
            savingPlanItem.plannedAmount = item.body.plannedAmount;
            savingPlanItem.currentAmount = item.body.currentAmount;
            savingPlanItem.getUntil      = item.body.getUntil;
            savingPlanItem.comment       = item.body.comment;
            savingPlanItem.user          = item.body.user;

            savingPlanItem.save().then(item   => { result.json('Zaktualizowano'); })
                                 .catch(error => { result.status(400).send("Nie udalo sie"); });
        }
    });
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