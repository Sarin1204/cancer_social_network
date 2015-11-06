/**
 * Created by sarin on 10/30/15.
 */
var profile = require('../controllers/profile.server.controller.js'),
    findFriend = require('../controllers/findFriend.server.controller.js'),
    child = require('../controllers/child.server.controller');

module.exports = function(app){
    app.route('/api/profile/:profileEmail')
        .get(profile.ProfileByEmail,profile.getProfile);

    app.route('/api/profileLimited/:profileEmail')
        .get(profile.ProfileByEmailLimited,profile.getProfile);

    app.route('/api/profileChild/:parentEmail')
        .get(child.childProfileByEmail, child.returnChild);

    app.route('/api/profileChildLimited/:parentEmail')
        .get(child.childProfileByEmailLimited,child.returnChild);

    app.route('/api/profileStatus/:profileEmailForStatus')
        .get(profile.getStatuses);

    app.route('/api/profileCheckRelationship/:profileEmailForRelationship')
        .get(profile.profileCheckFriend, profile.profileCheckPendingFriendRequestReceived, profile.profileCheckPendingFriendRequestSent);

    app.route('/api/profile/getFriendsForProfile/:profileEmail/:limit')
        .get(findFriend.getFollowed, profile.makeFriendGrid);
};