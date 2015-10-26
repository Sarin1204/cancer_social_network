/**
 * Created by sarin on 10/25/15.
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
        "age": {"type": "int"}
    },
    "key" : [["parent_email"],"id"]
};