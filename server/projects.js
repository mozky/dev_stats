const Firebase = require('./firebase.js')

var projectsRef = Firebase.getDb().ref("projects")
var projects = {}

projectsRef.on("value", function(snapshot) {
  console.log('Getting new projects data...')
  projects = snapshot.val()
})

exports.get = function() {
  return projects
}
