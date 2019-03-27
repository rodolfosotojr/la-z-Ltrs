var db = require("../models");
var path = require("path");

module.exports = function (app) {

  // Basic routes to the log in page
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  //Route to the home page
  app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/Home.html"));
  });

  //Route to the input page
  app.get("/input", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/newLetter.html"));
  });

  //Route to the how to guide
  app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/howTo.html"));
  });

  // Displays all of the past orders
  app.get("/api/orderhistory", function (req, res) {
    return res.json(pastorders);
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
