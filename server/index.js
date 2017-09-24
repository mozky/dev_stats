const Projects = require('./projects.js')
const Utils = require('./utils.js')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

exports.start = function(PORT, MODE, STATIC_FILES_LOCATION) {
  // Add cors support
  app.use(cors())

  // Add morgan as request logger
  app.use(morgan('dev'))

  // Health endpoint
  app.get('/health', function(req, res) {
    res.send({
      uptime: Utils.getTime()
    })
  })

  app.get('/projects', function(req, res) {
    res.status(200).send(Projects.get())
  })

  // We only serve de build files on production
  if (MODE === 'PRODUCTION') {
    console.log('Serving static files from ', STATIC_FILES_LOCATION)
    app.use(express.static(STATIC_FILES_LOCATION))

    app.get('/', function (req, res) {
      res.sendFile(STATIC_FILES_LOCATION + '/index.html')
    })

    app.listen(PORT, function () {
      console.log('Server running at port ' + PORT + '...')
    })
  } else {
    app.get('/', function (req, res) {
      res.send('Running in development mode, to start the react app run `npm start`')
    })

    app.listen(PORT, function () {
      console.log('Development server running at http://localhost:' + PORT + '...')
    })
  }

}
