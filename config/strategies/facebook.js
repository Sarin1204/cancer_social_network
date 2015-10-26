/**
 * Created by sarin on 10/24/15.
 */
/**
 * Created by sarin on 10/16/15.
 */
var passport = require('passport'),
    url = require('url'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../config'),
    parents = require('../../app/controllers/parent.server.controller'),
    models = require('express-cassandra');

module.exports = function() {
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
            profileFields: ['id', 'name','picture.type(large)', 'emails', 'displayName', 'about', 'gender','location']
        },
        function(token, refreshToken, profile, done){
            console.log("Facebook profile info == "+JSON.stringify(profile));
            var provider_data = profile._json;
            models.instance.parents.findOne({
                'email' : provider_data.email
            }, function(err, parent){
                if(err){
                    return done(err)
                }
                if (parent){
                    return done(null, parent);
                } else{
                    console.log("inside new parent")
                    var new_parent = new models.instance.parents({
                        email : provider_data.email,
                        firstname : provider_data.first_name,
                        lastname : provider_data.last_name,
                        address: provider_data.location.name,
                        profile_photo: provider_data.picture.url,
                        gender: provider_data.gender,
                        facebook_id: provider_data.id

                    });
                    new_parent.save(function(err){
                        if(err) {
                            console.log('Error message in signup '+err);
                            return res.redirect('/signup');
                        }
                        return done(null, new_parent);
                    })
                }
            })
        }));
};