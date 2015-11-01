/**
 * Created by sarin on 11/1/15.
 */

var addFriend = require('../controllers/addFriend.server.controller.js');

module.exports = function(app){

    app.route('/api/addPendingFriendRequest/')
        .post(addFriend.insertFriendRequest);

    app.route('/api/confirmPendingFriendRequest/')
        .post(addFriend.confirmPendingFriendRequest);
};