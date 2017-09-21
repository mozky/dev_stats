var admin = require("firebase-admin")

var serviceAccount = require("../dev-stats-firebase.key.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dev-stats-fdf2s.firebaseio.com"
})

var db = admin.database()

exports.getDb = function() {
  return db
}
