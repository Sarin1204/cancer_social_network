/**
 * Created by sarin on 11/1/15.
 */

var models = require('express-cassandra');

exports.deletePendingFriendRequest = function(req, res) {

    var query_object = { parent_received_email: req.body.parent_received_email,
                         parent_sent_email: req.body.parent_sent_email
                        };
    models.instance.pending_friend_requests.delete(query_object, function(err){
        if(err){
            console.log('Inside deletePendingFriendRequest server '+err);
            return res.status(500).send({ error: 'deletePendingFriendRequest returned error'+err });
        }
        else {
            console.log('Inside deletePendingFriendRequest server pass');
            return res.json({"status":"pass"})
        }
    });

}