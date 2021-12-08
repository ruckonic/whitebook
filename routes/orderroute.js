const ordercontroller=require('../controllers/ordercontroller')
const router=require('express').Router()
const guardauth=require('./guardauth')

router.get('/contact',guardauth.islogin,ordercontroller.getorderpage)
router.post('/addorder',guardauth.islogin,ordercontroller.order)
router.post('/endorder',guardauth.islogin,ordercontroller.endorder)
router.get('/oldorders',guardauth.islogin,ordercontroller.getoldorders)
router.get('/neworders',guardauth.islogin,ordercontroller.getneworders)
module.exports=router