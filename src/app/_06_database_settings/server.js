const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./database');

    const app = express();

    mongoose.Promise = global.Promise;
    mongoose.connect(config.database).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );

    const dbUserRoutes = require('../_08_database_routes/user-route');

    app.use(bodyParser.json());
    app.use(cors());
    const port = process.env.PORT || 4000;

    app.use('/RegisteredUsers', dbUserRoutes);

    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
    });