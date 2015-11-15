/**
 * Created by sarin on 11/12/15.
 */
var interests = require('../controllers/interests.server.controller');

module.exports = function(app){
    app.route('/api/typeAheadInterests/:val')
        .get(interests.typeAheadInterests)
}