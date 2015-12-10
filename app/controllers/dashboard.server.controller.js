/**
 * Created by sarin on 10/29/15.
 */

var models = require('express-cassandra');

exports.showStatuses = function(req,res){
    email = req.user.email;
    var query = 'Select status_update_id, DATEOF("status_update_id"), body, status_update_email, profile_photo, status_update_firstname, status_update_lastname, comments from home_status_updates where timeline_email=? LIMIT 10'
    var params = [email];
    models.instance.home_status_updates.execute_query(query, params, function(err, statuses){
        if(err){
            console.log("Status Query failed on server");
            res.json({"status":"fail"})
        }
        else {
            console.log('Statuses are '+JSON.stringify(statuses));
            for(var i=0;i<statuses.rows.length;i++){
                statuses.rows[i]['date'] = statuses.rows[i]['system.dateof(status_update_id)'].toString().substr(0,15);
                console.log("Status Query on server "+ JSON.stringify(statuses.rows)) ;
            }

            res.json(statuses.rows)
        }
    });
};

exports.getCancerType = function(req, res, next){
    var parent_email = req.user.email;

  models.instance.child.findOne({parent_email: parent_email},{raw: true, select:['cancer_type']}, function(err, cancer_type){
      if(err) {
          console.log('Error message in getCancerType' + err);
          return res.json({"status":"fail"});
      }
      else{
          console.log('found cancer type in server controller '+JSON.stringify(cancer_type));
          req.cancer_type = cancer_type['cancer_type'];
          next();
      }
  })
};

exports.friendRecommend = function(req,res){

    var cancer_type = req.cancer_type,
        followers = req.followers;
    console.log('followers in friendRecommend are '+followers);
    var friendObject = {};
    for(var i=0;i<followers.length;i++){
        friendObject[followers[i]] = true;
    }
    friendObject[req.user.email] = true;
    console.log('FriendObject is '+JSON.stringify(friendObject));

    var query = {
        cancer_type : cancer_type,
        $limit: (followers.length + 10)
    };
    models.instance.child_cancer_type.find(query,{raw: true, select: ['parent_email','parent_firstname', 'parent_lastname', 'parent_profile_photo']},function(err, friendsRecommended){
        if(err){
            console.log("Status Query failed on server "+err);
            res.json({"status":"fail"})
        }
        else {
            console.log("friendsRecommended Query on server " + JSON.stringify(friendsRecommended));
            friends = [];
            for(var i=0; i< friendsRecommended.length; i++){
                console.log('inside friendsRecommended loop '+friendsRecommended[i]['parent_email']);
                if (!(friendsRecommended[i]['parent_email'] in friendObject)){
                    friendsRecommended[i]['cancer_type'] = cancer_type;
                    friends.push(friendsRecommended[i]);
                }
            }
            console.log('Friends is '+JSON.stringify(friends));
            res.json(friends)
        }
    })

};