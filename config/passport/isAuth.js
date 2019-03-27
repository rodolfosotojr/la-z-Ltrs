// This users not logged in from viewing private pages and data.
module.exports = function(req, res, next) {
    // If logged in, continue to the restricted area
    if (req.user) {
      return next();
    }
  
    // else return to home page or maybe login?
    return res.redirect("/");
  };