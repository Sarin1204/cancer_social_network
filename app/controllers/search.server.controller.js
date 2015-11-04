/**
 * Created by sarin on 11/3/15.
 */
var models = require('express-cassandra');

exports.typeAheadParents = function(req, res){
    var val = req.params.val,
        prefix = val.substring(0,2).toLowerCase(),
        remaining = ""+val.substring(2,val.length).toLowerCase(),
        remainingNext = nextLetter(remaining);

    console.log("values for typeAheadParents are " +prefix + ' ' + remaining + ' ' + remainingNext);
    if(remaining == ""){
        var query = {
            prefix : prefix
        };

    }else{
        var query = {
            prefix : prefix,
            remaining : {'$gte' : remaining, '$lt' : remainingNext  }
        };
    }


    models.instance.parent_hash_tags.find(query, {raw: true, select: ['tag','firstname','lastname','profile_photo']}, function(err, parents){
        if(err){
            console.log('Inside typeAheadParents server '+err);
            return res.status(500).send({ error: 'typeAheadParents returned error'+err });
        }
        else{
            console.log('Inside typeAheadParents success'+JSON.stringify(parents));
            return res.json({"parents":parents});
        }
    })

};

function nextLetter(s){
    return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function(a){
        var c= a.charCodeAt(0);
        switch(c){
            case 90: return 'A';
            case 122: return 'a';
            default: return String.fromCharCode(++c);
        }
    });
}