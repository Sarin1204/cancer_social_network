/**
 * Created by sarin on 11/3/15.
 */

module.exports = {
    fields: {
        "prefix" : {"type": "text"},
        "remaining" : {"type": "text"},
        "tag" : {"type": "text"},
        "firstname" : {"type": "text"},
        "lastname" : {"type": "text"},
        "profile_photo": {"type": "text", "default": function(){
            if (this.gender == 'female'){
                return  "/img/empty_dp_female.png"
            }
            else
                return "/img/empty_dp_male.jpg"
            }
        }
    },
    "key" : [["prefix"],"remaining"]
};