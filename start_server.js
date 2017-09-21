const Server = require('./server')
const path = require('path')

if (process.env.NODE_ENV === 'production') {
  Server.start(
    process.env.PORT || 8081,
    'PRODUCTION',
    path.join(__dirname, 'build')
  )
} else {
  Server.start(process.env.PORT || 8081, 'DEVELOPMENT')
}
