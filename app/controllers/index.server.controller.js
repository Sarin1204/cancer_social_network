/**
 * Created by sarin on 10/21/15.
 */

exports.renderHome = function(req, res) {
    res.render('index', {
        title: "Children's Cancer Network",
        user: JSON.stringify(req.user)
    });
};