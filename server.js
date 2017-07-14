const express = require('express')

module.exports = {
  app: function () {
    const app = express()
    const indexPath = __dirname + '/index.html'
    const publicPath = express.static(__dirname + '/public')
    const nodePath = express.static(__dirname + '/node_modules')
    const srcPath = express.static(__dirname + '/src')

    app.get('/', function (_, res) { res.sendFile(indexPath) })
    app.use('/node_modules', nodePath)
    app.use('/src', srcPath)
    app.use('/public', publicPath)

    return app
  }
}
