const bookcontroller= require('../controllers/bookcontroller')
const router=require('express').Router()
const multer=require('multer')
const guardauth=require('./guardauth')

router.get(['/','/home'],bookcontroller.allbookcontroller)
router.get('/book/:id',bookcontroller.onebookcontroller)
router.get('/mybooks',guardauth.islogin,bookcontroller.getmybooks)
router.post('/addbook',multer({
    storage : multer.diskStorage({
        destination: (req, file, cb)=> {
          cb(null, __dirname+'/../assets/uploads')
        },
    filename: (req, file, cb)=> {
        cb(null,  Date.now() +'-'+ file.originalname )
        }

    })
}).single('image'),guardauth.islogin,bookcontroller.addbookcontroller)
router.get('/addbook',guardauth.islogin,bookcontroller.getaddbook)
router.get('/update/:id',guardauth.islogin,bookcontroller.getupdatebookpage)
router.get('/delete/:id',guardauth.islogin,bookcontroller.deletebook)
router.post('/update',multer({
    storage : multer.diskStorage({
        destination: (req, file, cb)=> {
          cb(null, __dirname+'/../assets/uploads')
        },
    filename: (req, file, cb)=> {
        cb(null,  Date.now() +'-'+ file.originalname )
        }

    })
}).single('image'),guardauth.islogin,bookcontroller.updatebook)
module.exports=router