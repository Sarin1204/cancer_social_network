/**
 * Created by sarin on 11/1/15.
 */

var models = require('express-cassandra');

exports.getFollowed = function(req, res, next){

    if( 'profile' in req){
        var email = req.profile.email;
    }
    else{
        var email = req.user.email;
    }



    var query = {
        followed_email: email
    };

    if(req.params.limit != undefined){
        query.$limit = parseInt(req.params.limit);
    }
    console.log("Email is"+req.user.email);
    models.instance.parent_friends.find(query,{raw: true,select: ["follower_email"]}, function(err, followers){
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

