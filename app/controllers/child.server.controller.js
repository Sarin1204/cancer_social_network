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
            query: "INSERT INTO child (parent_email, id, age, cancer_type, firstname, gender, hospital, interests, lastname, address, location, school) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            params: [child.parent_email, child.id,  child.age,  child.cancer_type,  child.firstname,  child.gender, child.hospital,  child.interests,  child.lastname, req.body.address, req.body.location, child.school]
        },

        {
            query: "INSERT INTO child_cancer_type (parent_email, id, age, cancer_type, firstname, gender, hospital, interests, lastname, parent_firstname, parent_lastname, parent_profile_photo, address, location, school) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?)",
            params: [child.parent_email, child.id,  child.age,  child.cancer_type,  child.firstname,  child.gender, child.hospital,  child.interests,  child.lastname, parent.firstname, parent.lastname, parent.profile_photo, req.body.address, req.body.location, child.school]
        }

    ];
    console.log('Child in signupChild server is '+JSON.stringify(child));
    models.instance.child.get_cql_client(function(err, client){
        client.batch(queries, { prepare: true }, function(err) {
            if(err) {
                console.log('Error message in signupChild' + err);
                return res.status(500).send({ error: 'signupChild returned error'+err });
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
            return res.status(500).send({ error: 'childProfileByEmail returned error'+err });
        }
        else if(child == undefined){
            console.log('Inside child server undefined '+err);
            return res.status(500).send({ error: 'childProfileByEmail returned error'+err });
        }
        else{
            console.log('Inside child server found '+child);
            req.child = child;
            next();
        }
    })
};

exports.childProfileByEmailLimited = function(req, res, next){
    parentEmail = req.params.parentEmail;
    models.instance.child.findOne({parent_email : parentEmail},{raw: true, select: ['cancer_type','interests','age', 'location']}, function(err, child){
        if(err){
            console.log('Inside childProfileByEmailLimited server error '+err);
            return res.status(500).send({ error: 'childProfileByEmailLimited returned error'+err });
        }
        else if(child == undefined){
            console.log('Inside childProfileByEmailLimited server undefined '+err);
            return res.status(500).send({ error: 'childProfileByEmailLimited returned error'+err });
        }
        else{
            console.log('Inside childProfileByEmailLimited server found '+child);
            req.child = child;
            next();
        }
    })
};


exports.returnChild = function(req, res){
    return res.json(req.child);
};

