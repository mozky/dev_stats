const Config = require('./config.server.js')
const Server = require('./server')
const path = require('path')

if (Config.NODE_ENV === 'production') {
  Server.start(
    Config.PORT,
    'PRODUCTION',
    path.join(__dirname, Config.BUILD_PATH)
  )
} else {
  Server.start(Config.PORT, 'DEVELOPMENT')
}
