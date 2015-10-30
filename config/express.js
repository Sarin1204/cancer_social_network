/**
 * Created by sarin on 10/20/15.
 */
var config = require('./config'),
    http = require('http'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('connect-flash'),
    CassandraStore = require("cassandra-store")(session);

module.exports = function () {
    var app = express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    var options = {
        "contacPoints": ["127.0.0.1"],
        "keyspace": "tests"
    };

    var cassandrastore = new CassandraStore(options);
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        cookie: {maxAge: 360000},
        store: cassandrastore
    }));


    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    require('../app/routes/index.server.route.js').home(app);
    require('../app/routes/signupParent.server.route.js')(app);
    require('../app/routes/signupChild.server.route.js')(app);
    require('../app/routes/signinParent.server.route.js')(app);
    require('../app/routes/postStatus.server.route.js')(app);
    require('../app/routes/dashboard.server.route.js')(app);

    app.use(express.static('./public'));

    return app;
}