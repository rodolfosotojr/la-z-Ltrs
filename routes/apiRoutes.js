var db = require("../models");
var passport = require("../config/passport/passport");
var request = require('request'); // for AJAX calls

// **PASSPORT** middleware module
var isAuth = require("../config/passport/isAuth");

module.exports = function (app) {
  // Register
  app.post("/api/register", function (req, res) {
    console.log(req.body);
    db.User.create(req.body).then(function () {
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

  // ***MySQL*** list past orders
  app.get("/api/savedorders", isAuth, function (req, res) {
    db.Order.findAll({
      // where: { userId: req.user.id }, order: [["id", "DESC"]]  }).then(function (results) {
      where: { userId: req.user.id }
    }).then(function (results) {
      return res.json(results);
    })
  })

  // ***Handwrytten*** list past orders
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

  // WIP get single order
  app.get("/api/order/:id", function (req, res) {
    db.Order.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function (orderData) {
      res.json(orderData);
    });
  });

  // SINGLE ORDER API ROUTE
  app.post("/api/createorder", function (req, res) {
    // NEED TO ADD CURRENT USER ID!!!
    req.body.UserId = req.user.id;
    console.log("******ORDER REQ.BODY*******\n ", req.body)

    db.Order.create(req.body).then(function () {
      res.redirect("/");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });

    // FUTURE TODO - Send a single order to Handwrytten

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
      response.json(info);
    })
  })

  // PUT route for updating posts
  app.put("/api/update/:id", function (req, res) {
    db.Order.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }).then(function (dbPost) {
        res.json(dbPost);
      });
  });

  // PUT route for updating Order Status
  app.put("/api/submitorder/:id", function (req, res) {
    console.log("------------CHANGE ORDER STATUS--------------\n", req.body);
    if (req.body.order_processed === "false") {
      req.body.order_processed = true
    }
    // else {
    //   req.body.order_processed = false
    // }
    db.Order.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }).then(function (dbPost) {
        res.json(dbPost);
      });
  });

  // Delete an example by id
  app.delete("/api/order/:id", isAuth, function (req, res) {
    var orderId = req.params.id;
    var userId = req.user.id;
    console.log(`----=====DELETE=====----\nCurrent User ID: ${userId}, Order userId: ${orderId}`);

    // FUTURE TODO- first check if current user id matches userId of the order
    db.Order.destroy({
      where: { id: orderId }
    }).then(function (dbOrder) {
      res.json(dbOrder);
    });
  });
};
