// Routing do bazy dla planu budzetowego

const express = require('express');
const app = express();
const dbPeriodicFeesRouter = express.Router();

// Ustawienie wymagalnosci modelu
let dbPeriodicFee = require('../_01_MongoDB_Models/periodic-fee-item-db');


// Defined get data(index or listing) route
dbPeriodicFeesRouter.route('/').get(function (item, result) 
{
    dbPeriodicFeesRouter.find(function (error, budgetPlan)
    {
        if(error) { console.log(error); }
        else      { result.json(budgetPlan); }
    });
});


// Dodawanie nowego planu
dbPeriodicFeesRouter.route('/add').post(function (item, result) 
{
  let periodicFeeItem = new dbPeriodicFee(item.body);
  periodicFeeItem.save()
    .then(game => { result.status(200).json({'oplata': 'Dodana'}); })
    .catch(err => { result.status(400).send("Nie udalo sie dodac."); });
});


// Edycja oplaty okresowej
dbPeriodicFeesRouter.route('/edit/:id').get(function (item, result) 
{
  let id = item.params.id;
  dbPeriodicFee.findById(id, function (err, periodicFeeItem) { result.json(periodicFeeItem); });
});

// Aktualizacja oplaty okresowej
dbPeriodicFeesRouter.route('/update/:id').post(function (item, result) 
{
    dbPeriodicFee.findById(item.params.id, function(error, periodicFeeItem) 
    {
        if (!periodicFeeItem) return next(new Error('Nie udalo sie poprac dokumentu'));
        else 
        {
            periodicFeeItem._id              = item.body._id;
            periodicFeeItem.category         = item.body.category;
            periodicFeeItem.name             = item.body.name;
            periodicFeeItem.paidUntil        = item.body.paidUntil;
            periodicFeeItem.paymentPeriod    = item.body.paymentPeriod;
            periodicFeeItem.paymentDeadline  = item.body.paymentDeadline;
            periodicFeeItem.warnings         = item.body.warnings
            periodicFeeItem.actions          = item.body.actions

            periodicFeeItem.save().then(item   => { result.json('Zaktualizowano'); })
                                  .catch(error => { result.status(400).send("Aktualizacja nieudana"); });
        }
    });
});

// Usuniecie oplaty okresowej
dbPeriodicFeesRouter.route('/delete/:id').get(function (item, result) 
{
    dbPeriodicFee.findByIdAndRemove({_id: item.params.id}, function(error, periodicFeeItem)
    {
        if(error) result.json(error);
        else result.json('Usunieto');
    });
});

module.exports = dbPeriodicFeesRouter;