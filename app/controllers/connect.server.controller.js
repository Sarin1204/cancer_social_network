/**
 * Created by sarin on 11/13/15.
 */

exports.getConnections = function(req, res){
    console.log('Inside getConnections' + JSON.stringify(req.query));
    var cancerType = req.query.cancer_type,
        interests = req.query.interests,
        locations = req.query.locations;

};