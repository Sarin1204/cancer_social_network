/**
 * Created by sarin on 10/26/15.
 */
/**
 * Created by sarin on 10/24/15.
 */
/**
 * Created by sarin on 10/16/15.
 */
var passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    config = require('../config'),
    models = require('express-cassandra'),
    setModel = require('../../app/setModel');

module.exports = function() {
    passport.use(new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL
        },
        function(token, refreshToken, profile, done){
            console.log("Google profile info == "+JSON.stringify(profile));
            var provider_data = profile._json;
            models.instance.parents.findOne({
                'email' : provider_data.emails[0].value
            }, function(err, parent){
                if(err){
                    return done(err)
                }
                    console.log("inside new parent")
                var property_array = ['email','firstname','lastname','profile_photo','gender','google_id'];
                var key_array = ['emails.0.value','name.givenName','name.familyName','image.url','gender','id'];
                parents_instance = setModel(key_array, property_array,provider_data);
                    var new_parent = new models.instance.parents(parents_instance);
                    new_parent.save(function(err){
                        if(err) {
                            console.log('Error message in signup '+err);
                            return res.redirect('/signup');
                        }
                        return done(null, new_parent);
                    })
            })
        }));
};