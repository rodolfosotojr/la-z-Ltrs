var db = require("../models");
var passport = require("../config/passport/passport");
var request = require('request'); // for AJAX calls

// **PASSPORT** middleware module
var isAuth = require("../config/passport/isAuth");

module.exports = function (app) {
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
  app.get("/api/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // list past orders from Handwrytten
  app.get("/api/orderhistory", isAuth, function (error, response, body) {
    request.post({
      url: 'https://api.handwrytten.com/v1/orders/list',
      form: {
        uid: process.env.HANDWRYTTEN_UID
      }
    }, function (err, res, body) {
      if (err) {
        return console.error('Past orders call failed:', err);
      }
      // return BODY JSON OBJECT
      var info = JSON.parse(body)
      return response.json(info);
    })
  })

  // list past orders
  app.post("/api/orders", function (error, response, body) {
    request.post({
      url: 'https://api.handwrytten.com/v1/orders/list',
      form: {
        uid: process.env.HANDWRYTTEN_UID
      }
    }, function (err, res, body) {
      if (err) {
        return console.error('Past orders call failed:', err);
      }
      var info = JSON.parse(body)
      console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
      console.log("httpResponse: ", res);
      console.log("body: ", body);
      response.json(info);
    })
  })

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
