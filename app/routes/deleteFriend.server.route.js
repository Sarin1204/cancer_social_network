/**
 * Created by sarin on 11/1/15.
 */

var deleteFriend = require('../controllers/deleteFriend.server.controller.js');

module.exports = function(app){

    app.route('/api/deletePendingFriendRequest')
        .post(deleteFriend.deletePendingFriendRequest)
};