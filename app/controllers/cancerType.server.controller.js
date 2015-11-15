/**
 * Created by sarin on 11/12/15.
 */
/**
 * Created by sarin on 11/3/15.
 */
var models = require('express-cassandra');

exports.typeAheadCancer = function(req, res){
    var val = req.params.val,
        prefix = capitalizeFirstLetter(val).substring(0,2),
        remaining = ""+val.substring(2,val.length).toLowerCase(),
        remainingNext = nextLetter(remaining);

    console.log("values for typeAheadCancer are " +prefix + ' ' + remaining + ' ' + remainingNext);
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


    models.instance.cancer_type_tags.find(query, {raw: true, select: ['tag']}, function(err, types){
        if(err){
            console.log('Inside typeAheadCancer server '+err);
            return res.status(500).send({ error: 'typeAheadCancer returned error'+err });
        }
        else{
            console.log('Inside typeAheadCancer success'+JSON.stringify(types));
            return res.json({"types":types});
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
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}