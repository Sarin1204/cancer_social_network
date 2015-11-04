/**
 * Created by sarin on 10/25/15.
 */
var models = require('express-cassandra'),
    uuid = require('node-uuid');

/*exports.signup = function(req, res, next) {
        var child = new models.instance.child(req.body);
        console.log('Child is '+JSON.stringify(child));
        child.save(function(err){
            if(err) {
                console.log('Error message in signupChild' + err);
                return res.redirect('/');
            }
            else{
                console.log('child created in server controller')
                return res.redirect('/#!/dashboard')
            }
        });
};*/

exports.signup = function(req, res, next) {
    var child = new models.instance.child(req.body);
    var parent = req.user;
    console.log('parent is'+JSON.stringify(parent));
    child.id = uuid.v1();
    var queries = [
        {
            query: "INSERT INTO child (parent_email, id, age, cancer_type, firstname, gender, hospital, interests, lastname, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            params: [child.parent_email, child.id,  child.age,  child.cancer_type.toLowerCase(),  child.firstname,  child.gender, child.hospital,  child.interests,  child.lastname,  child.zipcode]
        },

        {
            query: "INSERT INTO child_cancer_type (parent_email, id, age, cancer_type, firstname, gender, hospital, interests, lastname, zipcode, parent_firstname, parent_lastname, parent_profile_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?)",
            params: [child.parent_email, child.id,  child.age,  child.cancer_type,  child.firstname,  child.gender, child.hospital,  child.interests,  child.lastname,  child.zipcode, parent.firstname, parent.lastname, parent.profile_photo]
        }
    ];
    console.log('Child is '+JSON.stringify(child));
    models.instance.child_cancer_type.get_cql_client(function(err, client){
        client.batch(queries, { prepare: true }, function(err) {
            if(err) {
                console.log('Error message in signupChild' + err);
                return res.json({"status":"fail"});
            }
            else{
                console.log('child created in server controller');
                return res.json({"status":"pass"});
            }
        });
    });
};

exports.childProfileByEmail = function(req, res, next){
    console.log('parent_email is '+req.params.parentEmail);
    parentEmail = req.params.parentEmail;
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

exports.returnChild = function(req, res){
    return res.json(req.child);
};

