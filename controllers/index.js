var express = require("express"),
    router = express.Router(),
    User = require("../models/user");

router.use('/users', require("./users"));

module.exports = router;
