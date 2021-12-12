const bookController = require('../controllers/book.controller')
const router = require('express').Router()
const multer = require('multer')
const guardauth = require('./guard-auth.routes')
const path = require('path')

router.get(['/', '/home'], bookController.homePage)
router.get('/book/:id', bookController.detailsPage)
router.get('/mybooks', guardauth.islogin, bookController.myBooks)
router.post(
  '/addbook',
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + '/../assets/uploads')
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
      },
    }),
  }).single('image'),
  guardauth.islogin,
  bookController.addBook
)

router.get('/addbook', guardauth.islogin, bookController.addBookPage)
router.get('/update/:id', guardauth.islogin, bookController.updateBookPage)
router.get('/delete/:id', guardauth.islogin, bookController.deleteBook)
router.post(
  '/update',
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../assets/uploads'))
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
      },
    }),
  }).single('image'),
  guardauth.islogin,
  bookController.updateBook
)
module.exports = router
