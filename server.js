require("dotenv").config();
var express = require("express");
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');

// ****** PASSPORT CONFIG ******************
var passport = require("./config/passport/passport");
// ****** END PASSPORT CONFIG **************

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// ****** PASSPORT ******************
// use sessions to keep track of user's login status
app.use(session({ secret: "robot author", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// ****** END PASSPORT **************

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/public/html"));

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// if set to true the tables gets dropped and created
var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
