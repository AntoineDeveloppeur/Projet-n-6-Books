const Books = require('../models/book')

exports.getAllBooks = (req, res, next) => {
    Books.find()
        .then((allBooks) => {
            console.log('voici tous les books', allBooks)
            res.status(200).json({ message: allBooks })
        })
        .catch((error) => res.status(400).json({ error }))
}

exports.getABook = (req, res, next) => {}
exports.getBestRatings = (req, res, next) => {}
exports.postABook = (req, res, next) => {}
exports.modifyABook = (req, res, next) => {}
exports.deleteABook = (req, res, next) => {}
exports.rateABook = (req, res, next) => {}

module.exports = Books
