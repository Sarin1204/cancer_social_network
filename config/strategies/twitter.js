/**
 * Created by sarin on 10/27/15.
 */
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
    TwitterStrategy = require('passport-twitter').Strategy,
    config = require('../config'),
    models = require('express-cassandra'),
    setModel = require('../../app/setModel');

module.exports = function() {
    passport.use(new TwitterStrategy({
            consumerKey: config.twitter.clientID,
            consumerSecret: config.twitter.clientSecret,
            callbackURL: config.twitter.callbackURL
        },
        function(token, tokenSecret, profile, done){
            console.log("Twitter profile info == "+JSON.stringify(profile));
            var provider_data = profile._json;
            models.instance.parents.findOne({
                'email' : provider_data.screen_name
            }, function(err, parent){
                if(err){
                    return done(err)
                }
                console.log("inside new parent")
                var key_array = ['screen_name','name','location','photos.0.value','id'];
                var property_array = ['email','firstname','address','profile_photo','twitter_id'];
                parents_instance = setModel(key_array, property_array,provider_data);
                parents_instance.twitter_id = parents_instance.twitter_id.toString();
                try{
                    parents_instance.profile_photo = profile.photos[0].value
                }catch(err){}
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