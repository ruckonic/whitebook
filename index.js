const http = require('http')
const server = require('./server')

const config = require('./config')
const mongoConn = require('./connections/mongo')

;(async function start() {
  // Create a mongo connection
  try {
    await mongoConn()
    http.createServer(server).listen(config.PORT, function onServerRun() {
      console.log(`Server Running on port ${config.PORT}`)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
