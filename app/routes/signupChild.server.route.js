/**
 * Created by sarin on 10/25/15.
 */

var child = require('../controllers/child.server.controller'),
    parent = require('../controllers/parent.server.controller')

module.exports = function(app){
    app.route('/api/signupChild')
        .post(parent.requiresLogin,child.signup);
};