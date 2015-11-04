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
        "profile_photo" : {"type": "text"}
    },
    "key" : [["prefix"],"remaining"]
};