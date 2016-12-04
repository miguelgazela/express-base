var mongoose = require("mongoose"),
    crypto = require("crypto");

// Create a new schema for our user data

var schema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
  firstName: String,
  lastName: String,
  registeredAt: Date,
  lastSeenAt: Date
});

hash = function(password) {
  return crypto.createHash("sha1").update(password).digest("base64");
}

// Return a User model based upon the defined schema

module.exports = User = mongoose.model('User', schema);
