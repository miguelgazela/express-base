var express = require("express"),
    router = express.Router(),
    User = require("../models/user");

// Controllers

router.use("/users", require("./users"));

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = function(passport) {

  // GET login page
  router.get("/", function(req, res) {
    // display the login page with any flash message, if any
    res.render("index", {message: req.flash("message")});
  })

  // Handle Login POST
  router.post("/login", passport.authenticate("login", {
    successRedirect: "home",
    failureRedirect: "/",
    failureFlash: true
  }));

  // Facebook authentication and login
  router.get("/login/facebook", passport.authenticate("facebook", {scope: 'email'}));

  // Handle the callback after facebook has authenticated the user
  router.get('/login/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/'
  }));

  // GET Registration Page
  router.get("/signup", function(req, res) {
    res.render("auth/register", {message: req.flash("message")});
  });

  // Handle Registration POST
  router.post("/signup", passport.authenticate("signup", {
    successRedirect: "/home",
    failureRedirect: "/signup",
    failureFlash: true
  }));

  // GET Home Page
  router.get("/home", isAuthenticated, function(req, res) {
    res.render("home", {user: req.user});
  });

  // Handle Logout
  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect("/");
  });

  return router;
}
