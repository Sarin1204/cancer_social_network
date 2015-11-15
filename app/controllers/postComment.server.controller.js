/**
 * Created by sarin on 11/9/15.
 */

var models = require('express-cassandra');

exports.insertComment = function(req, res){
var followers = req.followers,
    status_email = req.body.profile_email,
    author_email = req.body.author_email,
    comment_body = req.body.comment,
    status_id = req.body.status_id,
    comment_id = models.timeuuid();

   /* var queries = [
        {
            query: "update parent_status_updates set comments = comments + [{id: ?, author_email: ?, comment_body: ?, " +
            "author_firstname: ?, author_lastname: ?, author_profile_photo: ?}] where email=? and id=? ;",
            params: [comment_id, author_email , comment_body, req.user.firstname, req.user.lastname, req.user.profile_photo, status_email, status_id]
        }
    ];

    for(var i=0; i<followers.length; i++){
        var query = {
            query: "update home_status_updates set comments = comments + [{id: ?, author_email: ?, comment_body: ?, " +
            "author_firstname: ?, author_lastname: ?, author_profile_photo: ?}] where timeline_email=? and id=? ;",
            params: [comment_id, author_email , comment_body, req.user.firstname, req.user.lastname, req.user.profile_photo, followers[i], status_id]
        };
        queries.push(query);
    }*/

    var comment = [{
        id: comment_id,
        author_email: author_email,
        comment_body: req.body.comment,
        author_firstname: req.user.firstname,
        author_lastname: req.user.lastname,
        author_profile_photo: req.user.profile_photo

    }];

    var queries = [
        {
            query: "update parent_status_updates set comments = comments + ? where email=? and id=?",
            params: [comment, status_email, status_id]
        }
    ];

    for(var i=0; i<followers.length; i++){
        var query = {
            query: "update home_status_updates set comments = comments + ? where timeline_email=? and status_update_id=?",
            params: [comment, followers[i], status_id]
        };
        queries.push(query);
    }

    console.log("queries are "+JSON.stringify(queries));

    models.instance.parent_status_updates.get_cql_client(function(err, client){
        client.batch(queries, { prepare: true }, function(err) {
            if(err){
                console.log('Error in inserting comment'+err );
                return res.status(500).send({ error: 'Error in inserting comment'+err });
            }
            else{
                console.log('Data updated on cluster ' + err);
                return res.json({"status": "pass"})
            }
        });
    });


};