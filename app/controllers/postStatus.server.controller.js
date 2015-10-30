/**
 * Created by sarin on 10/28/15.
 */

var models = require('express-cassandra'),
    uuid = require('node-uuid');

exports.getFollowed = function(req, res, next){
    var email = req.user.email;
    console.log("Email is"+req.user.email);
    models.instance.parent_inbound_follows.find({followed_email:email},{raw: true,select: ["follower_email"]}, function(err, followers){
        if(err){
            console.log("Error in parent_inbound_follows" + err);
            return res.json({"status": "fail"})
        }
        else {
            console.log("followers are"+JSON.stringify(followers));
            new_followers = [];
            for(var i=0;i<followers.length;i++){
                new_followers.push(followers[i]["follower_email"])
            }

            req.followers = new_followers;
            next();
        }
    });
};

exports.postStatus = function(req, res){
    console.log("Inside postStatus and body is "+JSON.stringify(req.body));

    var email = req.body.email,
        profile_photo = req.user.profile_photo,
        firstname = req.user.firstname,
        lastname = req.user.lastname,
        status = req.body.status,
        followers = req.followers,
        status_id = models.timeuuid();

    console.log("followers are "+JSON.stringify(followers));
    console.log('status is '+status);

    var queries = [
        {
            query: "INSERT INTO parent_status_updates (email, id, body) VALUES (?, ?, ?)",
            params: [email, status_id, status]
        }
    ];

    for(var i=0; i<followers.length; i++){
        var query = {
            query: "INSERT INTO home_status_updates (timeline_email, status_update_id, body, status_update_email, profile_photo, status_update_firstname, status_update_lastname) VALUES (?, ?, ?, ?, ?, ?, ?)",
            params: [followers[i], status_id, status, email, profile_photo, firstname, lastname]
        }
        queries.push(query);
    }

    console.log("queries are "+JSON.stringify(queries));

    models.instance.parent_status_updates.get_cql_client(function(err, client){
        client.batch(queries, { prepare: true }, function(err) {
            if(err){
                return res.json({"status": "failed"})
            }
            console.log('Data updated on cluster ' + err);
        });
    });

/*models.instance.parents.execute_batch(queries, function(err){
console.log("Inside execute batch error"+err);
    return res.json({"postStatus": "fail"})
});
return res.json({"postStatus":"pass"})*/
};