/*
  Konfiguracja serwera 'express'
*/     
      
var express      = require('express');
var path         = require('path');
var bodyParser   = require('body-parser');
var passport     = require('passport');
var config       = require('./database');

require('./passport_config');
const dbUserRoutes = require('../_08_database_routes/user-route');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.database).then(
                                       () => {console.log('Database is connected') },
                                       err => { console.log('Can not connect to the database'+ err)}
                                      );


app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;

app.use(passport.initialize())
app.use('/Project', dbUserRoutes);

const server = app.listen(port, function()
{ console.log('Listening on port ' + port); });