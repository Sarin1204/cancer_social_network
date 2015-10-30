/**
 * Created by sarin on 10/21/15.
 */


var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    models = require('express-cassandra'),
    bcrypt = require('bcrypt');

module.exports = function() {
    passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password'
    },function(email, password, done){
        models.instance.parents.findOne({email : email}, function(err, parent){
            /*console.log("local js person found is "+JSON.stringify(parent));*/
            if (err) {
                return done(err);
            }

            if (!parent) {
                return done(null, false, {
                    message: 'Unknown user'
                });
            }

            bcrypt.compare(password, parent.password, function(err, res){
                if (!res){
                    console.log('invalid password')
                    return done(null, false, {
                        message: 'Invalid Password'
                    });
                }
                else{
                   /* console.log('Found in local js'+parent);*/
                    return done(null, parent);
                }
            });

        });
    }));
};