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
    .then(game => { result.status(200).json({'adUnit': 'AdUnit in added successfully'}); })
    .catch(err => { result.status(400).send("unable to save to database"); });
});


// Edycja planu budzetowego
dbPeriodicFeesRouter.route('/edit/:id').get(function (item, result) 
{
  let id = item.params.id;
  dbPeriodicFee.findById(id, function (err, periodicFeeItem) { result.json(periodicFeeItem); });
});

// Aktualizacja planu budzetowego
dbPeriodicFeesRouter.route('/update/:id').post(function (item, result) 
{
    dbPeriodicFee.findById(item.params.id, function(error, periodicFeeItem) 
    {
        if (!periodicFeeItem) return next(new Error('Could not load Document'));
        else 
        {
            periodicFeeItem.category         = item.body.category;
            periodicFeeItem.name             = item.body.name;
            periodicFeeItem.paidUntil        = item.body.paidUntil;
            periodicFeeItem.paymentPeriod    = item.body.paymentPeriod;
            periodicFeeItem.paymentDeadline  = item.body.paymentDeadline;
            periodicFeeItem.warnings         = item.body.warnings
            periodicFeeItem.actions          = item.body.actions

            periodicFeeItem.save().then(item   => { result.json('Update complete'); })
                                  .catch(error => { result.status(400).send("unable to update the database"); });
        }
    });
});

// Usuniecie planu budzetowego
dbPeriodicFeesRouter.route('/delete/:id').get(function (item, result) 
{
    dbPeriodicFee.findByIdAndRemove({_id: item.params.id}, function(error, periodicFeeItem)
    {
        if(error) result.json(error);
        else result.json('Successfully removed');
    });
});

module.exports = dbPeriodicFeesRouter;