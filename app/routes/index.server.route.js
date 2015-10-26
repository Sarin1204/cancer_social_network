/**
 * Created by sarin on 10/21/15.
 */

var index = require('../controllers/index.server.controller')

exports.home = function(app){
        app.get('/', index.renderHome);
};