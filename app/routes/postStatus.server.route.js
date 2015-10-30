/**
 * Created by sarin on 10/28/15.
 */

var postStatus = require('../controllers/postStatus.server.controller.js');

module.exports = function(app){

    app.route('/api/postStatus')
        .post(postStatus.getFollowed,postStatus.postStatus);

};