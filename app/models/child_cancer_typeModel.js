/**
 * Created by sarin on 10/30/15.
 */

module.exports = {
    fields: {
        "parent_email" : {"type": "text"},
        "id"     : { "type": "uuid", "default": {"$db_function": "uuid()"} },
        "firstname" : {"type": "text"},
        "lastname" : {"type": "text"},
        "cancer_type" : {"type": "text"},
        "zipcode" : {"type": "int"},
        "interests" : {"type": "set", typeDef: "<text>"},
        "hospital": {"type": "text"},
        "gender": {"type": "text"},
        "age": {"type": "int"},
        "parent_firstname": {"type": "text"},
        "parent_lastname": {"type": "text"},
        "parent_profile_photo": {"type": "text"}
    },
    "key" : [["cancer_type"],"parent_email"]
};