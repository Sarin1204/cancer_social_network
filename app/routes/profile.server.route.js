/**
 * Created by sarin on 10/30/15.
 */
var profile = require('../controllers/profile.server.controller.js');

module.exports = function(app){
    app.route('/api/profile/:profileEmail')
        .get(profile.getProfile);

    app.route('/api/profileChild/:parentEmail')
        .get(profile.getChild);

    app.route('/api/profileStatus/:profileEmailForStatus')
        .get(profile.getStatuses);

    app.route('/api/profileCheckRelationship/:profileEmailForRelationship')
        .get(profile.profileCheckFriend, profile.profileCheckPendingFriendRequestReceived, profile.profileCheckPendingFriendRequestSent);

    app.param('profileEmail',profile.ProfileByEmail);
    app.param('parentEmail',profile.childProfileByEmail);
};