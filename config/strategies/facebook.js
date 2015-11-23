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
    models = require('express-cassandra'),
    setModel = require('../../app/setModel');

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
                    console.log("inside new parent");
                var key_array = ['email','first_name','last_name','location.name','picture.data.url','gender','id'];
                var property_array = ['email','firstname','lastname','address','profile_photo','gender','facebook_id'];
                parents_instance = setModel(key_array, property_array,provider_data);
                    var new_parent = new models.instance.parents(parents_instance);
                    new_parent.save(function(err){
                        if(err) {
                            console.log('Error message in signup '+err);
                            return res.redirect('/signup');
                        }
                        else{
                            var prefix = parents_instance.email.substr(0,2),
                                remaining = parents_instance.email.substr(2,parents_instance.email.length),
                                firstname = parents_instance.firstname,
                                lastname = parents_instance.lastname,
                                profile_photo = parents_instance.profile_photo,
                                tag = parents_instance.email;
                            var query = 'insert into parent_hash_tags (prefix, remaining, firstname, lastname, profile_photo, tag) values (?, ?, ?, ?, ?, ?)',
                                params = [prefix, remaining, firstname, lastname, profile_photo, tag];
                            models.instance.parent_hash_tags.execute_query(query, params, function(err, people){
                                if(err){
                                    console.log('Error message in signup '+err);
                                    return res.redirect('/signup');
                                }
                                else{
                                    return done(null, new_parent);
                                }
                            });
                        }
                });
            })
        }));
};