/**
 * Created by sarin on 11/3/15.
 */

var search = require('../controllers/search.server.controller');

module.exports = function(app){
    app.route('/api/typeAheadParents/:val')
        .get(search.typeAheadParents)
}