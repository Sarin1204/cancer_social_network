/**
 * Created by sarin on 11/12/15.
 */

var cancerType = require('../controllers/cancerType.server.controller');

module.exports = function(app){
    app.route('/api/typeAheadCancer/:val')
        .get(cancerType.typeAheadCancer)
}