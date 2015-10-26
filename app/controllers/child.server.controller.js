/**
 * Created by sarin on 10/25/15.
 */
var models = require('express-cassandra');

exports.signup = function(req, res, next) {
        var child = new models.instance.child(req.body);
        console.log('Child is '+JSON.stringify(child));
        child.save(function(err){
            if(err) {
                console.log('Error message in signupChild' + err);
                return res.redirect('/');
            }
            else{
                console.log('child created in server controller')
                return res.redirect('/#!/dashboard')
            }
        });
};