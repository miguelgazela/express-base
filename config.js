module.exports = {

  serverPort: process.env.PORT || 8080,

  // Database configuration
  mongoDBStageURL: "mongodb://miguel-admin:" + process.env.MONGODB_BOXY_ADMIN_PASS +"@ds119548.mlab.com:19548/boxy-stage"
}
