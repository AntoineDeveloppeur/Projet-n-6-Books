const Books = require('../models/book')

exports.getAllBooks = (req, res, next) => {
    console.log('lapplication reçoit la consigne de donner tous les bouquins')
    Books.find()
        .then((allBooks) => {
            console.log('voici tous les books', allBooks)
            res.status(200).json({ message: allBooks })
        })
        .catch((error) => res.status(400).json({ error }))
}

exports.getABook = (req, res, next) => {
    Books.findOne({ _id: req.params.id })
        .then((book) => {
            res.status(200).json(book)
        })
        .catch((error) => res.status(400).json({ error }))
}

exports.postABook = (req, res, next) => {
    const newBook = new Books({
        userId: req.body.userId,
        title: req.body.title,
        author: req.body.author,
        imageUrl: req.body.imageUrl,
        year: req.body.year,
        ratings: [], // La notation est laissé vide, à voir comment la base de donnée accepte les propriétés vide
        averageRating: null, // - Est-ce que null convient pour ne rien mettre pour un chiffre ?
    })
}

exports.getBestRatings = (req, res, next) => {}
exports.modifyABook = (req, res, next) => {}
exports.deleteABook = (req, res, next) => {}
exports.rateABook = (req, res, next) => {}
