let express = require('express');
let app = express();
let port = process.env.PORT || 8080;
let mongoose = require('mongoose');
let passport = require('passport');
let flash = require('connect-flash');

let morgan = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/node-account-management', {
  useMongoClient: true,
});

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(session({ secret: 'node-account-manager-session-secret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.set('view engine', 'ejs'); // set up ejs for templating

require('./app/routes.js')(app, passport);
require('./config/passport')(passport); // pass passport for configuration

app.listen(port);
console.log('Server listening on port ' + port);