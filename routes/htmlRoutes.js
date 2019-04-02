var db = require("../models");
var path = require("path");
var express = require("express");

// **PASSPORT** middleware module
var isAuth = require("../config/passport/isAuth");

module.exports = function (app) {

  // CSS and Image paths
  app.use("/public", express.static(path.join(__dirname, "../public/")));

  // Basic routes to the log in page
  app.get("/", function (req, res) {
    // **PASSPORT**
    if (req.user) {
      res.redirect("/home");  // if already logged-in go to home page
    }
    // **PASSPORT** if NOT logged in show the login page
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
  });

  // Registration Page
  app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/registration.html"));
  });

  //Route to the home page
  // **PASSPORT** - ADDED 'isAuth' middleware to route parameter below
  // if user not logged in, will be redirected as shown in 'config/passport/isAuth.js' file
  app.get("/home", isAuth, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/Home.html"));
  });

  //Route to the input page
  // **PASSPORT** - ADDED 'isAuth' middleware to route parameter below
  app.get("/newletter", isAuth, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/newLetter.html"));
  });

  //Route to the how to guide
  app.get("/howTo", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/howTo.html"));
  });

  app.get("/update", isAuth, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/update.html"));
  });

  app.get("*", function (req, res) {
    res.redirect("/");
  });
};
