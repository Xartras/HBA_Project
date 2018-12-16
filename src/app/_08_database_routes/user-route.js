var express = require('express');
var dbUserRoutes = express.Router();
var jwt = require('express-jwt');
var auth = jwt(
  {
    secret: 'secret',
    userProperty: 'payload'
  });

var user = require('../_02_services/get-user-srvc');
var userAuth = require('../_02_services/user-auth-srvc');


// Get user details
dbUserRoutes.get('/getUser', auth, user.getUser);

// authentication
dbUserRoutes.post('/userRegistration', userAuth.userRegistration);
dbUserRoutes.post('/userLoggingIn', userAuth.userLoggingIn);

module.exports = dbUserRoutes;