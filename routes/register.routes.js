const usercontroller = require('../controllers/registercontroller')
const router = require('express').Router()
const guardauth = require('./guard-auth.routes')

router.get(
  '/onlyadminregisteronlyadmin',
  guardauth.isnotlogin,
  usercontroller.gotoregister
)
router.post('/register', usercontroller.adduser)

router.get(
  '/onlyadminloginonlyadmin',
  guardauth.isnotlogin,
  usercontroller.gotologin
)
router.post('/login', usercontroller.login)

router.post('/logout', usercontroller.logout)
module.exports = router
