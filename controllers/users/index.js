var express = require("express"),
    router = express.Router(),
    auth = require("../../middlewares/auth");

router.get("/:id", function(req, res) {
  return "user ID";
});

module.exports = router;
