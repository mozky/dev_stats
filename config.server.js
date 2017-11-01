// Config file to store settings and provide the apps with env vars

if (process.env.NODE_ENV === 'production') {
  exports.NODE_ENV = 'production'
  exports.API_URL = 'http://ec2-54-175-152-218.compute-1.amazonaws.com'
  exports.BUILD_PATH = 'build'
} else {
  exports.NODE_ENV = 'development'
  exports.API_URL = '//localhost:80'
}

exports.PORT = 80
exports.FIREBASE_KEY_LOCATION = '/dev_stats/dev-stats-firebase.key.json'
exports.FIREBASE_DATABASE_URL = 'https://dev-stats-fdf2s.firebaseio.com'
