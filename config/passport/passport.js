// This local strategy code is based from 15 - supplemental folder
// Documentation at http://www.passportjs.org/docs/configure/

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

// require user model so we can find existing user using Seqelize
var db = require("../../models");

// setup Local Strategy using email and password saved in a database
passport.use(new LocalStrategy({ usernameField: "email" },
  function (email, password, done) {
    db.User.findOne({ where: { email: email } }).then(function (dbUser) {
      // if email and password are not correct, flash a message (Flash not set up)
      if (!dbUser) {
        return done(null, false, { message: "No email exists by that name." });
      } else if (!dbUser.validPassword(password)) {
        return done(null, false, { message: "Wrong password." });
      }
      // If email exists and has matching password, return dbUser
      return done(null, dbUser);
    });
  }
));

// Session setup - need to review serializeUser & deserializeUser
// From Doc: Passport will serialize and deserialize user instances to and from the session

// this serialized the user object data is saved in express-session
passport.serializeUser(function (user, callback) {
  callback(null, user);
});
// this deserializes the user object from the session
passport.deserializeUser(function (userObj, callback) {
  callback(null, userObj);
});

// export so server.js can use it.
module.exports = passport;
