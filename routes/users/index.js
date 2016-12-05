var express = require("express"),
    router = express.Router(),
    auth = require("../../middlewares/auth");

// Middleware

function special_authorize(req, res, next) {
  if (req.user === 'admin') {
   next()
  } else {
    res.status(403).send('Forbidden')
  }
}

// Applying middleware to all routes in the router

router.use(function (req, res, next) {
  next();
  // if (req.user === 'user') {
  //   next()
  // } else {
  //   res.status(403).send('Forbidden')
  // }
})

router.get("/", function(req, res) {
  res.send('GET Users')
});

router.get("/:id", special_authorize, function(req, res) {
  console.log("get USER");
  res.send("GET User :id")
});

module.exports = router;
