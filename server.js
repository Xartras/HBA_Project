const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    dbAddress = require('./_03_MongoDB_Config/database');
    var passport = require('passport');

    require('./_03_MongoDB_Config/passport_config');

    const app = express();

    // Polaczenie z baza MongoDB
    mongoose.Promise = global.Promise;
    mongoose.connect(dbAddress.databaseAddress,  { useNewUrlParser: true }).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );

    // Ustawienie schematow laczenia z baza
    const budgetPlanRoutes   = require('./_02_MongoDB_Routes/budget-plan-item-route');
    const periodicFeesRoutes = require('./_02_MongoDB_Routes/periodic-fee-item-route');
    const userRoutes         = require('./_02_MongoDB_Routes/user-route');

    app.use(bodyParser.json());
    app.use(cors());
    const port = process.env.PORT || 4000;

    // Inicjalizacja
    app.use(passport.initialize())

    // "Powiedzenie" aplikacji aby korzystala ze zdefiniowanych schematow
    app.use('/BudgetPlan', budgetPlanRoutes);
    app.use('/PeriodicFees', periodicFeesRoutes);
    app.use('/Users', userRoutes);


    // Wychwycenie nieautoryzowanej proby dostania sie do aplikacji
    app.use(function (error, req, result, next) 
    {
      if (error.name === 'UnauthorizedError') 
      {
        result.status(401);
        result.json({"message" : result.name + ": " + result.message});
      }
    });


    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
    });