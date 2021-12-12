const mongoose = require('mongoose')

var schemauser = mongoose.Schema({
  _id: mongoose.ObjectId,
  username: String,
  email: String,
  password: String,
})

var user = mongoose.model('user', schemauser)

exports.adduser = (username, email, password) => {
  return new Promise(async (resolve, reject) => {
    const _user = await user.findOne({ email: email })

    if (_user) {
      return reject('User already register')
    }
    user.insertMany({
      username: username,
      email: email,
      password: password,
    })
  })
}

exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    return user
      .findOne({ email: email })
      .then((user) => {
        if (user) {
          let passwordIsEqual = user.password == password
          if (passwordIsEqual) {
            console.log('login')

            resolve(user._id)
          } else {
            reject('wrong password!!')
          }
        } else {
          reject('user not exists!!')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  })
}
