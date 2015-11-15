/**
 * Created by sarin on 11/12/15.
 */
module.exports = {
    fields: {
        "prefix" : {"type": "text"},
        "remaining" : {"type": "text"},
        "tag" : {"type": "text"},
    },
    "key" : [["prefix"],"remaining"]
};