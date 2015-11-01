/**
 * Created by sarin on 10/31/15.
 */
module.exports = {
    fields: {
        "followed_email" : {"type": "text"},
        "follower_email" : {"type": "text"}
    },
    "key" : [["followed_email"],"follower_email"],
    "indexes" : ["follower_email"]
};