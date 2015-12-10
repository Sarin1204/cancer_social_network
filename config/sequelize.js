/**
 * Created by sarin on 11/26/15.
 */

var Sequelize = require('sequelize');

    var sequelize = new Sequelize('cancer_social_network', 'socialAdmin', '3800', {
        dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
        port:    3306, // or 5432 (for postgres)
    });
    sequelize
        .authenticate()
        .then(function(err) {
            console.log('Connection has been established successfully.');

        }, function (err) {
            console.log('Unable to connect to the database:', err);
        });


exports.getSequelize = sequelize;