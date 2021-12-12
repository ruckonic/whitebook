const mongoose = require('mongoose')

const { Schema, SchemaTypes } = mongoose

const _schema = {
  _id: SchemaTypes.ObjectId,
  title: String,
  description: String,
  price: String,
  image: String,
  userId: SchemaTypes.ObjectId,
}
const BookSchema = new Schema(_schema)

const Book = mongoose.model('book', BookSchema)

function getAll() {
  return Book.find({})
}

/**
 *
 * Search book by id
 * @param {mongoose.ObjectId|string} id
 */
function getById(id) {
  return Book.findOne({ _id: id })
}

/**
 *
 * add books
 * @param {_schema|_schema[]} book
 * @returns
 */
function add(book) {
  const books = Array.isArray(book) ? book : [book]
  return Book.insertMany(books)
}

/**
 * Search book by id
 * @param {mongoose.ObjectId|string} id
 */
function getOwn(id) {
  return Book.find({ userId: id })
}

function deleteById(id) {
  return Book.deleteOne({ _id: id })
}

/**
 *
 * update books
 * @param {mongoose.ObjectId|string} id
 * @param {_schema} book
 */
function update(id, book) {
  return Book.updateOne({ _id: id }, { ...book })
}

module.exports = {
  update,
  add,
  deleteById,
  getById,
  getAll,
  getOwn,
}
