// Routing do bazy dla planu budzetowego

const express = require('express');
const app = express();
const dbBudgetPlanRouter = express.Router();

// Ustawienie wymagalnosci modelu
let dbBudgetPlan = require('../_01_MongoDB_Models/budget-plan-item-db');


// Defined get data(index or listing) route
dbBudgetPlanRouter.route('/').get(function (item, result) 
{
    dbBudgetPlanRouter.find(function (error, budgetPlan)
    {
        if(error) { console.log(error); }
        else      { result.json(budgetPlan); }
    });
});


// Dodawanie nowego planu
dbBudgetPlanRouter.route('/add').post(function (item, result) 
{
  let budgetPlanItem = new dbBudgetPlan(item.body);
  budgetPlanItem.save()
    .then(game => { result.status(200).json({'budgetPlan': 'Dodano'}); })
    .catch(err => { result.status(400).send("Nie udalo sie"); });
});


// Edycja planu budzetowego
dbBudgetPlanRouter.route('/edit/:id').get(function (item, result) 
{
  let id = item.params.id;
  dbBudgetPlan.findById(id, function (err, budgetPlanItem) { result.json(budgetPlanItem); });
});

// Aktualizacja planu budzetowego
dbBudgetPlanRouter.route('/update/:id').post(function (item, result) 
{
    dbBudgetPlan.findById(item.params.id, function(error, budgetPlanItem) 
    {
        if (!budgetPlanItem) return next(new Error('Nie udalo sie'));
        else 
        {
            budgetPlanItem._id      = item.body.id;
            budgetPlanItem.type     = item.body.type;
            budgetPlanItem.category = item.body.category;
            budgetPlanItem.name     = item.body.name;
            budgetPlanItem.period   = item.body.period;
            budgetPlanItem.amount   = item.body.amount;
            budgetPlanItem.comment  = item.body.comment;
            budgetPlanItem.actions  = item.body.actions

            budgetPlanItem.save().then(item   => { result.json('Zaktualizowano'); })
                                 .catch(error => { result.status(400).send("Nie udalo sie"); });
        }
    });
});

// Usuniecie planu budzetowego
dbBudgetPlanRouter.route('/delete/:id').get(function (item, result) 
{
    dbBudgetPlan.findByIdAndRemove({_id: item.params.id}, function(error, budgetPlanItem)
    {
        if(error) result.json(error);
        else result.json('Usunieto');
    });
});

module.exports = dbBudgetPlanRouter;