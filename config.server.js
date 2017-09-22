// Config file to store settings and provide the apps with env vars

if (process.env.NODE_ENV === 'production') {
  exports.NODE_ENV = 'production'
  exports.API_URL = 'http://edlio-dev-stats.us-east-1.elasticbeanstalk.com'
  exports.BUILD_PATH = 'build'
} else {
  exports.NODE_ENV = 'development'
  exports.API_URL = '//localhost:8081'
}

exports.PORT = 8081
exports.FIREBASE_KEY_LOCATION = '/dev-stats/dev-stats-firebase.key.json'
exports.FIREBASE_DATABASE_URL = 'https://dev-stats-fdf2s.firebaseio.com'
