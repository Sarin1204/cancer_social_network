/**
 * Created by sarin on 10/21/15.
 */
var passport = require('passport'),
    models = require('express-cassandra');

module.exports = function(){

    passport.serializeUser(function(parent, done){
        console.log("serial person == "+JSON.stringify(parent));
        done(null, parent.email);
    });

    passport.deserializeUser(function(email, done){
        console.log('deserial email == '+email);
        models.instance.parents.findOne({email : email}, function(err, parent){
            done(err, parent);
        });
    });
    require('./strategies/local.js')();
    require('./strategies/facebook.js')();
    /*require('./strategies/google.js')();*/
};