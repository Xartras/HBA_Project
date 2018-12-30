// Routing do bazy dla planu budzetowego

const express = require('express');
const app = express();
const dbPeriodicFeesRouter = express.Router();

// Ustawienie wymagalnosci modelu
let dbPeriodicFee = require('../_01_MongoDB_Models/periodic-fee-item-db');


// Defined get data(index or listing) route
dbPeriodicFeesRouter.route('/').get(function (item, result) 
{
    dbPeriodicFee.find(function (error, periodivFees)
    {
        if(error) { console.log(error); }
        else      { result.json(periodivFees); }
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