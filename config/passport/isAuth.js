// The following code is based from 15 - supplemental folder
// Documentation at http://www.passportjs.org/docs/configure/

// This module allows registered users to view a restricted location
module.exports = function (req, res, next) {
  // If user was logged in and serialized from passport.js, user can view the page
  if (req.user) {
    return next();
  }

  // Otherwise return visitor to home page or maybe login?
  return res.redirect("/");
};