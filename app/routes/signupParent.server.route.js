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

    app.get('/api/checkChild',parent.checkChild);

    // route to test if the user is logged in or not
     app.get('/signedin', function(req, res) {
         console.log("inside /signedin "+req.isAuthenticated());
         res.send(req.isAuthenticated() ? req.user : '0');
     });

     app.get('/signout', parent.signout)
};

