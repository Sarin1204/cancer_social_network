/**
 * Created by sarin on 10/31/15.
 */

var models = require('express-cassandra');

exports.pendingFriendRequests = function(req, res){
    var parent_received_email = req.user.email;
    console.log("parent received email is"+req.user.email);
    models.instance.pending_friend_requests.find({parent_received_email: parent_received_email},{raw: true, select:['parent_sent_email','sender_firstname','sender_lastname','sender_profile_photo']}, function(err, friendRequests){
        if(err) {
            console.log('Inside showFriendRequests server '+err);
            return res.status(500).send({ error: 'showFriendRequests returned error'+err });
        }
        else if(friendRequests.length == 0){
            console.log('Inside showFriendRequests undefined '+err);
            return res.json([]);
        }
        else{
            console.log('found friendRequests in server controller '+JSON.stringify(friendRequests));
            return res.json(friendRequests);
        }
    })
};