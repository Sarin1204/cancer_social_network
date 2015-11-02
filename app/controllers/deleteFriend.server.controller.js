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

};

exports.deleteFriendship = function(req, res) {

    console.log("Inside deleteFriendship"+req.user.email + req.body.friendBeingDeleted);
    var queries = [
        {
            query: 'Delete from parent_friends where followed_email = ? and follower_email = ?',
            params: [req.user.email, req.body.friendBeingDeleted]
        },

        {
            query: 'Delete from parent_friends where followed_email = ? and follower_email = ?',
            params: [req.body.friendBeingDeleted, req.user.email]

        }

    ];

    models.instance.parent_friends.get_cql_client(function(err, client){
        client.batch(queries, { prepare: true }, function(err) {
            if(err){
                console.log('Deletion of friendship on Parent friends'+err);
                return res.status(500).send({ error: 'Deletion of friendship on Parent friends successful'+err });
            }
            else{
                console.log('Deletion of friendship on Parent friends successful');
                return res.json({"status": "pass"})
            }

        });
    });

};