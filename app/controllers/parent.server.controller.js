/**
 * Created by sarin on 10/23/15.
 */

var models = require('express-cassandra'),
    bcrypt = require('bcrypt');

exports.signup = function(req, res, next) {
    if (!req.user) {
        var parent = new models.instance.parents(req.body);
        console.log('Person is '+JSON.stringify(parent));
        parent.provider = 'local';
        bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash(parent.password, salt, function(err, hash){
                parent.password = hash;
                parent.save(function(err){
                    if(err) {
                        console.log('Error message in signupParent' + err);
                        return res.redirect('/');
                    }
                    req.login(parent, function(err){
                        if (err) return next(err);
                        return res.redirect('/#!/signupChild');
                    });
                });
            });
        });

    } else {
        return res.redirect('/');
    }
};

exports.checkChild = function(req, res, next){
    var parent_email = req.user.email;
    models.instance.child.findOne({parent_email:parent_email}, function(err, child){
        if(err){
            console.log('Inside checkchild error '+err);
            return res.redirect('/#!/signupChild')
        }
        else if(child == undefined){
            console.log('Inside checkchild undefined '+err);
            return res.redirect('/#!/signupChild')
        }
        else{
            console.log('Inside checkchild found '+child);
            return res.redirect('/#!/dashboard')
        }
    })
};

exports.requiresLogin = function(req, res, next){
    console.log("inside requiresLogin "+req.isAuthenticated());
    if(!req.isAuthenticated()){
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }
    next();
};

exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};
