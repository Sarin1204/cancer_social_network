/**
 * Created by sarin on 10/23/15.
 */
module.exports = {
    fields: {
        "id"     : { "type": "uuid", "default": {"$db_function": "uuid()"} },
        "email" : {"type": "text"},
        "password" : {"type": "text"},
        "firstname" : {"type": "text"},
        "lastname" : {"type": "text"},
        "child_id" : {"type": "uuid"},
        "address" : {"type": "text"},
        "zipcode" : {"type": "int"},
        "phone" : {"type": "varint"},
        "facebook_id": {"type": "text"},
        "google_id": {"type": "text"},
        "twitter_id": {"type": "text"},
        "profile_photo": {"type": "text", "default": function(){
            if (this.gender == 'female'){
                    return  "/img/empty_dp_female.png"
                }
            else
                    return "/img/empty_dp_male.jpg"
            }
        },
        "gender": {"type": "text"}
    },
    "key" : [["email"]]
};