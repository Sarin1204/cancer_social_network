/**
 * Created by sarin on 10/30/15.
 */

var models = require('express-cassandra');

exports.ProfileByEmail = function(req,res, next, profileEmail){

    models.instance.parents.findOne({email:profileEmail},{raw: true}, function(err, parent){
        if(err){
            console.log('Inside parent server '+err);
            return res.json('{"status": "error"}');
        }
        else if(parent == undefined){
            console.log('Inside parent server undefined '+err);
            return res.json({"status": "no_child"});
        }
        else{
            console.log('Inside parent server found '+parent);
            req.profile = parent;
            next();
        }
    })

};

exports.childProfileByEmail = function(req, res, next, parentEmail){

    models.instance.child.findOne({parent_email : parentEmail},{raw: true}, function(err, child){
        if(err){
            console.log('Inside child server '+err);
            return res.json('{"status": "error"}');
        }
        else if(child == undefined){
            console.log('Inside child server undefined '+err);
            return res.json({"status": "no_child"});
        }
        else{
            console.log('Inside child server found '+child);
            req.child = child;
            next();
        }
    })
};

exports.getStatuses = function(req, res){
    console.log('profileEmailForStatus' + JSON.stringify(req.params));
   /* models.instance.parent_status_updates.find({email: req.params.profileEmailForStatus},{raw: true, select: ['dateOf(id)','body']}, function(err, statuses){
        if(err){
            console.log('Inside getStatuses server '+err);
            return res.status(500).send({ error: 'GetStatus returned error'+err });
        }
        else if(statuses == undefined){
            console.log('Inside getStatuses undefined '+err);
            return res.json({});
        }
        else{
            console.log('Inside getStatuses server found '+statuses);
            res.json(statuses);
        }
    })*/

    var query = 'Select DATEOF("id"), "body" from parent_status_updates where email=?'
    var params = [req.params.profileEmailForStatus];
    models.instance.parent_status_updates.execute_query(query, params, function(err, statuses){
        if(err){
            console.log('Inside getStatuses server '+err);
            return res.status(500).send({ error: 'GetStatus returned error'+err });
        }
        else if(statuses == undefined){
            console.log('Inside getStatuses undefined '+err);
            return res.json({});
        }
        else{
            for(var i=0;i<statuses.rows.length;i++){
                statuses.rows[i]['date'] = statuses.rows[i]['DATEOF(id)'].toString().substr(0,15)
            }
            console.log('Inside getStatuses server found '+JSON.stringify(statuses.rows));
            res.json(statuses.rows);
        }
    });
};

exports.findIfProfileFriend = function(req, res){
    query = {
        'follower_email' : req.user.email,
        'followed_email' : req.params.profileEmailForFriend
    }
    models.instance.parent_friends.findOne(query, {raw :true}, function(err, relationship){
        if(err){
            console.log('Inside findIfProfileFriend server '+err);
            return res.status(500).send({ error: 'GetStatus returned error'+err });
        }
        else if(relationship == undefined){
            console.log('No relationship found '+JSON.stringify(relationship));
            return res.json({"relationship" : false})

        }
        else{
            console.log('Relationship found '+JSON.stringify(relationship));
            return res.json({"relationship" : true})
        }
    })
}

exports.getChild = function(req, res){
    res.json(req.child);
}

exports.getProfile = function(req, res){
    res.json(req.profile);
};