// Routing do bazy dla planu budzetowego

const express = require('express');
const app = express();
const dbBudgetPlanRouter = express.Router();

// Ustawienie wymagalnosci modelu
let dbBudgetPlan = require('../_01_MongoDB_Models/budget-plan-item-db');

// Pobranie danych
dbBudgetPlanRouter.route('/').get(function (item, result) 
{
    dbBudgetPlan.find(function (error, budgetPlan)
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