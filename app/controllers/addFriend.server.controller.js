/**
 * Created by sarin on 11/1/15.
 */

var models = require('express-cassandra');

exports.insertFriendRequest = function(req, res){
    var parent_received_email = req.body.friendEmail;
    console.log('parent_receive_email is '+parent_received_email);
    console.log('req.user is '+JSON.stringify(req.user));

    var newFriendRequest = new models.instance.pending_friend_requests({parent_received_email: parent_received_email, parent_sent_email :req.user.email,
        sender_firstname: req.user.firstname, sender_lastname: req.user.lastname, sender_profile_photo: req.user.profile_photo});
    newFriendRequest.save(function(err){
        if(err){
            console.log('Inside insertFriendRequest server '+err);
            return res.status(500).send({ error: 'insertFriendRequest returned error'+err });
        }
        else {
            return res.json({"status":"pass"})
        }
    });

};

exports.confirmPendingFriendRequest = function(req, res){
    var parent_received_email =  req.user.email;
    var parent_sent_email = req.body.friendEmail;

    var queries = [
        {
            query: 'delete from "pending_friend_requests" where "parent_received_email" = ? and "parent_sent_email" = ?',
            params: [parent_received_email, parent_sent_email]
        },
        {
            query: 'INSERT INTO parent_friends (followed_email, follower_email) VALUES (?, ?)',
            params: [parent_received_email, parent_sent_email]
        },
        {
            query: 'INSERT INTO parent_friends (followed_email, follower_email) VALUES (?, ?)',
            params: [parent_sent_email, parent_received_email]
        }
    ];

    models.instance.parent_friends.get_cql_client(function(err, client){
        client.batch(queries, { prepare: true }, function(err) {
            if(err){
                console.log('Friend Relationship insert batch failed '+err)
                return res.status(500).send({ error: 'Friend Relationship insert batch failed '+err });
            }
            else {
                console.log('Data updated on cluster ' + err);
                return res.json({"status": "pass"})
            }
        });
    });

};