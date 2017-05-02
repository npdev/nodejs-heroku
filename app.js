var express = require('express'),
        mongoose = require('mongoose'),
        bodyParser = require('body-parser'),
        passport = require("passport"),
        expressValidator = require('express-validator'),
        flash = require("connect-flash"),
        session = require('express-session');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
var mongoUrl = process.env.MONGODB_HEROKU;
// Use native Node promises
mongoose.Promise = global.Promise;
// connect to MongoDB
mongoose.connect(mongoUrl)
        .then(() => console.log('DB connection succesful: ' + mongoUrl))
        .catch((err) => console.error(err + ' : ' + mongoUrl));

app.use(flash());

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
var User = require("./models/User");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

require('./controllers/init').addAdmin();
var index = require('./routes/index');
app.use('/', index);
var admin = require('./routes/admin');
app.use('/admin', admin);

// error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});