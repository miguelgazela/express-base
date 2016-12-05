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
  lastSeenAt: Date,
  birthDate: Date,
  avatar: String,
  description: String,
  active: Boolean,
  weight: Number,
  height: Number,
  gender: String,
  facebook: {
    id: String,
    access_token: String,
    profileURL: String,
    coverURL: String
  }
});

hash = function(password) {
  return crypto.createHash("sha1").update(password).digest("base64");
}

// Return a User model based upon the defined schema

module.exports = User = mongoose.model('User', schema);
