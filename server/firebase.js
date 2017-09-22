var admin = require("firebase-admin")
var Config = require("../config.server")

var serviceAccount = require(Config.FIREBASE_KEY_LOCATION)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: Config.FIREBASE_DATABASE_URL
})

var db = admin.database()

exports.getDb = function() {
  return db
}
