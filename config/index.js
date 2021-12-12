const config = {
  PORT: process.env.PORT || 3000,
  session: {
    secret: process.env.SESSION_SECRET || 'Secret sessions',
  },
  mongo: {
    dbName: process.env.DB_NAME || 'books',
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
  },
}

module.exports = config
