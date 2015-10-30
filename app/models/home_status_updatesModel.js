/**
 * Created by sarin on 10/29/15.
 */

module.exports = {
    fields: {
        "timeline_email" : {"type": "text"},
        "status_update_id"     : { "type": "timeuuid"},
        "body" : {"type": "text"},
        "status_update_email" : {"type": "text"},
        "status_update_firstname" : {"type": "text"},
        "status_update_lastname" : {"type": "text"},
        "profile_photo" : {"type": "text"}
    },
    "key" : [["timeline_email"],"status_update_id"]
};