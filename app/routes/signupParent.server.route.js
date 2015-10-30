/**
 * Created by sarin on 10/22/15.
 */

var parent = require('../controllers/parent.server.controller'),
    passport = require('passport');

module.exports = function(app){
    console.log('Inside signupparent.server.routes')
    app.route('/api/signupParent')
        .post(parent.signup);

    app.get('/oauth/facebook', passport.authenticate('facebook', {
        scope: ['email','user_location','user_about_me'],
        failureRedirect: '/'
    }));
    app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/',
        /*successRedirect: '/#!/signupChild'*/
        successRedirect: '/api/checkChild'
    }));

    app.get('/oauth/google', passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'],
        failureRedirect: '/signin'
    }));
    app.get('/oauth/google/callback',
        passport.authenticate('google', { failureRedirect: '/' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/api/checkChild');
        });

    app.get('/oauth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/'
    }));
    app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/',
        /*successRedirect: '/#!/signupChild'*/
        successRedirect: '/api/checkChild'
    }));


    app.get('/api/checkChild',parent.checkChild);

    app.get('/api/angular/checkChild',parent.angularCheckChild);

    // route to test if the user is logged in or not
     app.get('/signedin', function(req, res) {
         console.log("inside /signedin "+req.isAuthenticated());
         res.send(req.isAuthenticated() ? req.user : '0');
     });

     app.get('/signout', parent.signout)
};

