/**
 * Created by sarin on 10/28/15.
 */

module.exports = {
    fields: {
        "email" : {"type": "text"},
        "id"     : { "type": "timeuuid"},
        "body" : {"type": "text"}
    },
    "key" : [["email"],"id"]
};