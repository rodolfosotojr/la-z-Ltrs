var db = require("../models");
var passport = require("../config/passport/passport");


module.exports = function (app) {
  // Displays all of the past orders
  app.get("/api/orderhistory", function (req, res) {
    return res.json(pastorders);
  });

  // Register
  app.post("/api/register", function (req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  });

  // if login successful redirect to home 
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // since the API call is doing post we set this /api/login call to redirect to the HOME page
    res.json("/home");
  });

  // Logout using .logout() method then redirect to login page.
  app.get("/api/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });


  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};
