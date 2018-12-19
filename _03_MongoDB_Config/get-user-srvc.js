var mongoose = require('mongoose');
var User     = require('../_01_MongoDB_Models/user-db');

module.exports.getUser = function(req, res) 
{
    if (!req.payload._id) 
    {
        res.status(401).json( {"message" : "UnauthorizedError: private profile" } );
    }
    else 
    {
        User.findById(req.payload._id)
            .exec(function(err, user) { res.status(200).json(user); } );
    }
};