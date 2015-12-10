/**
 * Created by sarin on 11/13/15.
 */

var sequelize = require("../../config/sequelize").getSequelize;

exports.getConnections = function(req, res){
    var cancerType = req.query.cancerType,
        interests = req.query.interests,
        locations = req.query.locations;

    locations = locations.toString().split(',');
    var paramLocations = "";
    for(var i=0;i<locations.length;i++){
        paramLocations += "'"+ locations[i] +"'"
    }
    cancerType = cancerType.toString().split(',');
    var paramCancerTypes = "";
    for(var i=0;i<cancerType.length;i++){
        paramCancerTypes += "'"+ cancerType[i] +"'"
    }

    interests = interests.toString().split(',');
    var paramInterests = "";
    for(var i=0;i<interests.length;i++){
        paramInterests += "'"+ interests[i] +"'"
    }
    var query = "select l.email, p.firstname, p.lastname, p.profile_photo, c.cancer_type, l.locations, group_concat(i.name separator ',') interests from" +
        " (select parent_email email,group_concat(l.name separator ',') locations from location l" +
        " inner join parent_location p_l on l.location_id = p_l.location_id where parent_email in" +
        " (select distinct(p.email) from parent p inner join parent_location p_l on p.email = p_l.parent_email" +
        " inner join child c on p.child_id = c.child_id inner join child_interest c_l on c.child_id = c_l.child_id" +
        "  where location_id in (select location_id from location where name in ("+ paramLocations +")) or interest_id in " +
        "(select interest_id from interest where name in ("+ paramInterests +")) or cancer_type in ("+ paramCancerTypes +"))" +
        " group by parent_email) as l inner join parent p on l.email = p.email inner join child_interest c_i" +
        " on c_i.child_id = p.child_id inner join interest i on i.interest_id = c_i.interest_id inner join child c on c.child_id = p.child_id group by l.email;";

    sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
        .then(function(parents) {
            console.log(JSON.stringify("Inside connect query return successful parents are "+parents))
            return res.json(parents)
        })
};