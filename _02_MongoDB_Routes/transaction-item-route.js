// Routing do bazy dla transakcji

const express = require('express');
const app = express();
const dbTransactionRouter = express.Router();

// Ustawienie wymagalnosci modelu
let dbTransaction = require('../_01_MongoDB_Models/transaction-item-db');

// Pobranie danych
dbTransactionRouter.route('/').get(function (item, result) 
{
    dbTransaction.find(function (error, transaction)
    {
        if(error) { console.log(error); }
        else      { result.json(transaction); }
    });
});

// Dodawanie nowej transakcji
dbTransactionRouter.route('/add').post(function (item, result) 
{
  let transactionItem = new dbTransaction(item.body);
  transactionItem.save()
    .then(game => { result.status(200).json({'budgetPlan': 'Dodano'}); })
    .catch(err => { result.status(400).send("Nie udalo sie"); });
});

// Usuniecie transakcji
dbTransactionRouter.route('/delete/:id').get(function (item, result) 
{
    dbTransaction.findByIdAndRemove({_id: item.params.id}, function(error, transactionItem)
    {
        if(error) result.json(error);
        else result.json('Usunieto');
    });
});

module.exports = dbTransactionRouter;