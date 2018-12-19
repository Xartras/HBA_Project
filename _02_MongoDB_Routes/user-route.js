var express = require('express');
var dbUserRoutes = express.Router();
var jwt = require('express-jwt');
var jwtAuth = jwt(
  {
    secret: 'secret',
    userProperty: 'payload'
  });

var user = require('../_03_MongoDB_Config/get-user-srvc');
var userAuth = require('../_03_MongoDB_Config/user-auth-srvc');


// Get user details
dbUserRoutes.get('/getUser', jwtAuth, user.getUser);

// authentication
dbUserRoutes.post('/userRegistration', userAuth.userRegistration);
dbUserRoutes.post('/userLoggingIn', userAuth.userLoggingIn);

module.exports = dbUserRoutes;