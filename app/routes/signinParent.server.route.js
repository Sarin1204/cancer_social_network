/**
 * Created by sarin on 10/26/15.
 */

var parent = require('../controllers/parent.server.controller'),
    passport = require('passport');

/*module.exports = function(app){
    app.route('/api/signinParent')
        .post(passport.authenticate('local',{
            failureFlash: true
        }));
};*/
module.exports = function(app) {
    app.post('/api/signinParent', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.json({status:"failed"});
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.json({status:"passed"});
            });
        })(req, res, next);
    });
}

/*
module.exports = function(app){
    app.route('/api/signinParent')
        .post(function(req, res){
            console.log()
            passport.authenticate('local', function(err, user, info){
                if(err){
                    console.log('passport authenticate '+err)
                }
                if(!user){
                    return res.json({postStatus:"failed"})
                }
                req.login(user, function(err){
                    if(err) {
                        console.log('passport login error'+err)
                    }else{
                        return res.json({postStatus:"passed"})
                    }

                })
            })
        })

};*/
