/**
 * Created by sarin on 11/9/15.
 */

var postComment = require('../controllers/postComment.server.controller.js'),
    findFriend = require('../controllers/findFriend.server.controller.js');

module.exports = function(app){

    app.route('/api/postComment')
        .post(findFriend.getFollowed,postComment.insertComment)

};