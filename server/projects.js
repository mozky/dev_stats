const Firebase = require('./firebase.js')

var projectsRef = Firebase.getDb().ref("projects")
var projects = {}
projectsRef.once("value", function(snapshot) {
  projects = snapshot.val()
})

exports.get = function() {
  return projects
}
