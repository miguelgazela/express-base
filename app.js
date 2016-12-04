console.log("May Node be with you...");

var express = require("express"),
    bodyParser = require("body-parser"),
    routes = require("./routes"),
    config = require("./config"),
    mongoose = require("mongoose"),
    http = require("http"),
    pug = require("pug");

// Create an express instance and set a port variable

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("./middlewares/users"));
app.use(require("./controllers"));

// Set /public as our static content dir
app.use("/",  express.static(__dirname + "/public/"));

// Connect to our mongo database
// mongoose.connect("mongodb://localhost/boxy-stage");

// Set pug as the templating engine
app.set("view engine", "pug");

// Index route
app.get("/", routes.index);

// Fire it up (start our server)
var server = http.createServer(app).listen(config.serverPort, function() {
  console.log("Express server listening on port", config.serverPort);
});
