const usercontroller=require('../controllers/registercontroller')
const router=require('express').Router()
const body=require('body-parser').urlencoded({extended:true})
const guardauth=require('./guardauth')

router.get('/onlyadminregisteronlyadmin',guardauth.isnotlogin,usercontroller.gotoregister)
router.post('/register',body,usercontroller.adduser)


router.get('/onlyadminloginonlyadmin',guardauth.isnotlogin,usercontroller.gotologin)
router.post('/login',body,usercontroller.login)

router.post('/logout',usercontroller.logout)
module.exports=router


