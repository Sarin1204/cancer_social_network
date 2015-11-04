/**
 * Created by sarin on 11/3/15.
 */

var child = require('../controllers/child.server.controller'),
    parent = require('../controllers/parent.server.controller');

module.exports = function(app){

  app.route('/api/getChildDetails/:parentEmail')
      .get(child.childProfileByEmail, child.returnChild);

  app.route('/api/updateParent')
      .post(parent.updateParent);

  app.route('/api/updateChild')
      .post(parent.requiresLogin,child.signup);

};