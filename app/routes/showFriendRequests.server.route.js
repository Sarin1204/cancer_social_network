/**
 * Created by sarin on 10/31/15.
 */

var showFriendRequests = require('../controllers/showFriendRequests.server.controller.js');

module.exports = function(app){

    app.route('/api/pendingFriendRequests')
        .get(showFriendRequests.pendingFriendRequests)
}