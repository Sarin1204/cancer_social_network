/**
 * Created by sarin on 10/29/15.
 */

var dashboard = require('../controllers/dashboard.server.controller.js'),
    postStatus = require('../controllers/postStatus.server.controller.js');

module.exports = function(app){

    app.route('/api/showStatuses')
        .get(dashboard.showStatuses);

    app.route('/api/friendRecommend')
        .get(dashboard.getCancerType,postStatus.getFollowed,dashboard.friendRecommend);

};