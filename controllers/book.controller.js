const Book = require('../models/book.model')

//general home info
const namestore = 'white book store'
const description =
  'white book store is the digital store which sell programming books online. We are dedicated to creating “a world enlightened by reading” by selling the industry’s largest catalog of books..'
//

exports.homePage = async function homePage(req, res, next) {
  const books = await Book.getAll()

  res.render('home', {
    books: books,
    verifuser: req.session.userId,
    msg: req.flash('msg')[0],
    desc: description,
    namestore: namestore,
  })
}

exports.detailsPage = async function detailsPage(req, res, next) {
  const bookId = req.params.id
  const book = await Book.getById(bookId)

  res.render('detail', {
    book: book,
    verifuser: req.session.userId,
  })
}

exports.addBookPage = async function addBookPage(req, res, next) {
  res.render('addbook', { verifuser: req.session.userId })
}

exports.addBook = async function addBook(req, res, next) {
  const { filename = null } = req.file || {}
  const { title, price, description } = req.body

  const added = await Book.add({
    title,
    description,
    image: filename,
    price,
    userId: req.session.userId,
  })

  console.log(added)
  req.flash('msg', added)
  res.redirect('/home')
}

exports.myBooks = async function myBooks(req, res, next) {
  const { userId } = req.session

  const books = await Book.getOwn(userId)

  res.render('mybooks', { books: books, verifuser: req.session.userId })
}

exports.deleteBook = async function deleteBook(req, res, next) {
  try {
    await Book.deleteById(req.params.id)
    res.redirect('/mybooks')
  } catch (err) {
    console.error(err)
    res.status(500).send(err.toString())
  }
}

exports.updateBookPage = async function updateBookPage(req, res, next) {
  const { userId } = req.session
  const book = await Book.getById(req.params.id).catch(console.error)
  const belongToUser = book.userId.equals(userId)
  console.log({ book, userId, belongToUser })

  if (!belongToUser) {
    return res.redirect('/')
  }

  res.render('updatebookpage', { book, verifuser: userId })
}

exports.updateBook = async function updateBook(req, res, next) {
  const { filename = null } = req.file || {}
  const { bookid, ...book } = req.body
  const updateData = { ...book }

  if (filename) {
    updateData.image = filename
  }

  await Book.update(bookid, updateData)

  res.redirect('/mybooks')
}
