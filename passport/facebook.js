var FacebookStrategy = require('passport-facebook').Strategy,
    User = require("../models/user"),
    facebookConfig = require("../facebook.js");

module.exports = function(passport) {

  passport.use('facebook', new FacebookStrategy({
    clientID: facebookConfig.appID,
    clientSecret: facebookConfig.appSecret,
    callbackURL: facebookConfig.callbackURL,
    profileFields: facebookConfig.profileFields
  },

  // Facebook will send back the tokens and profile
  function(accessToken, refresh_token, profile, done) {

    console.log("FB Profile", profile);

    // asynchronous
    process.nextTick(function() {

      User.findOne({"id": profile.id}, function(err, user) {

        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err) {
          return done(err);
        }

        // if the user is found, then log them in
        if (user) {
          return done(null, user); // user found, return that user
        } else {

          // if there is not user found with that facebook id, create them
          var newUser = new User();

          // set all of the facebook information in our user model
          newUser.facebook.id = profile.id;
          newUser.facebook.access_token = accessToken;
          newUser.firstName = profile.name.givenName;
          newUser.lastName = profile.name.familyName;
          newUser.registeredAt = new Date();
          newUser.lastSeenAt = new Date();
          newUser.active = false;
          newUser.email = profile.emails[0].value;
          newUser.avatar = profile.photos[0].value;

          newUser.save(function(err) {
            if (err) {
              throw err;
            }

            return done(null, newUser);
          });
        }
      });

    });

  }));
};
