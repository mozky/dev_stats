if (process.env.NODE_ENV === 'production') {
  exports.NODE_ENV = 'production'
  exports.API_URL = 'http://edlio-dev-stats.us-east-1.elasticbeanstalk.com'
} else {
  exports.NODE_ENV = 'development'
  exports.API_URL = '//localhost:8081'
}
