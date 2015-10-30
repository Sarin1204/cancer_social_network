/**
 * Created by sarin on 10/28/15.
 */

module.exports = {
    fields: {
        "follower_email" : {"type": "text"},
        "followed_email" : {"type": "text"}
    },
    "key" : [["follower_email"],"followed_email"]
};