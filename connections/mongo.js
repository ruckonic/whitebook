const mongo = require('mongoose')
const config = require('../config').mongo

/**
 * MongoConnection
 * @returns {Promise<void>}
 */
function connect() {
  return new Promise(function (resolve, reject) {
    mongo.connect(
      config.uri,
      {
        dbName: config.dbName,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      function connError(err) {
        if (err) {
          return reject(err)
        }

        console.log('Connection success to MongoDB')
        resolve()
      }
    )
  })
}

module.exports = connect
