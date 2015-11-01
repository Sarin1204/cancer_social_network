/**
 * Created by sarin on 10/31/15.
 */
module.exports = {
    fields: {
        "parent_received_email" : {"type": "text"},
        "parent_sent_email" : {"type": "text"},
        "sender_firstname" : {"type": "text"},
        "sender_lastname" : {"type": "text"},
        "sender_profile_photo" : {"type": "text"}
    },
    "key" : [["parent_received_email"],"parent_sent_email"],
    "indexes" : ["parent_sent_email"]
};