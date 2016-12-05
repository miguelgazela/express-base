console.log("May Node be with you...");

var express = require("express"),
    bodyParser = require("body-parser"),
    routes = require("./routes"),
    config = require("./config"),
    mongoose = require("mongoose"),
    http = require("http"),
    pug = require("pug"),
    favicon = require("serve-favicon"),
    cookieParser = require("cookie-parser"),
    passport = require("passport"),
    expressSession = require("express-session"),
    flash = require("connect-flash");

// Create an express instance and set a port variable

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(require("./middlewares/users"));
app.use(cookieParser());
app.use(expressSession({secret: process.env.BOXY_SECRET_KEY}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Set pug as the templating engine
app.set("view engine", "pug");

// Set /public as our static content dir
app.use("/",  express.static(__dirname + "/public/"));
app.use("/bower_components", express.static(__dirname + "/bower_components"));

// Connect to our mongo database
mongoose.connect(config.mongoDBStageURL);

// Initialize Passport
var initPassport = require("./passport/init");
initPassport(passport);

// Routing
var routes = require('./routes')(passport);
app.use("/", routes);

// Fire it up (start our server)
var server = http.createServer(app).listen(config.serverPort, function() {
  console.log("Express server listening on port", config.serverPort);
});

module.exports = app;
