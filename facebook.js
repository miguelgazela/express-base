module.exports = {
  "appID": process.env.BOXY_STAGE_FACEBOOK_APP_ID,
  "appSecret": process.env.BOXY_STAGE_FACEBOOK_APP_SECRET,
  "callbackURL": "http://localhost:8080/login/facebook/callback",
  "profileFields": ['id', 'displayName', 'photos', 'email', 'about', 'birthday', 'cover', 'first_name', 'hometown', 'last_name', 'link', 'locale']
}
