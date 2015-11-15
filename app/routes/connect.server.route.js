/**
 * Created by sarin on 11/12/15.
 */

var child = require('../controllers/child.server.controller'),
    connect = require('../controllers/connect.server.controller');

module.exports = function(app) {

    app.route('/api/connectChild/:parentEmail')
        .get(child.childProfileByEmail,child.returnChild);

    app.route('/api/getConnections')
        .get(connect.getConnections)
};