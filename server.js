/**
 * Created by sarin on 10/20/15.
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var cassandra = require('./config/cassandra');
var passport = require('./config/passport');

var app = express();
var passport = passport();
app.listen(3000);
module.exports = app;

console.log('Server running at http://localhost:3000/');