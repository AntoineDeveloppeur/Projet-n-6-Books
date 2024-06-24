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

//En cours de contruction
exports.postABook = (req, res, next) => {
    console.log('je suis dans la fonction postABook')
    console.log('req.body.book', req.body.book)
    const bookObject = JSON.parse(req.body.book)
    console.log('bookObject', bookObject)
    delete bookObject.userId

    const newBook = new Books({
        userId: req.auth.userId,
        title: req.body.title,
        author: req.body.author,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
        }`,
        year: req.body.year,
        ratings: [{ userId: req.auth.userId, grade: 4 }], // La notation est laissé vide, à voir comment la base de donnée accepte les propriétés vide
        averageRating: 0,
    })
    newBook
        .save()
        .then(() => {
            console.log('livre sauvegardé!')
            res.status(201).json({ message: 'livre enregistré' })
        })
        .catch((error) => {
            console.log('dans le catch de newBooksave')
            res.status(400).json({ error })
        })
}

exports.getBestRatings = (req, res, next) => {}

exports.modifyABook = (req, res, next) => {
    const bookObject = req.file
        ? {
              ...JSON.parse(req.body.book),
              imageUrl: `${req.protocol}://${req.get('host')}/images/${
                  req.file.name
              }`,
          }
        : { ...req.body } //pourquoi a-t-on besoin du spread operator ici. Sous quel forme la requête arrive-t-elle sans fichier ?
    // On pourrait très bien mettre req.body tout court
    delete bookObject._userId
    Books.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(403).json({
                    message:
                        "utilisateur n'est pas autorisé à modifier le livre",
                })
            } else {
                Books.updateOne(
                    { _id: bookObject._id },
                    { ...bookObject, _id: req.params._id }
                )
                    .then(() =>
                        res.status(200).json({ message: 'book modifié' })
                    )
                    .catch((error) => res.status(400).json({ error }))
            }
        })
        .catch((error) => res.status(401).json({ error }))
}

exports.deleteABook = (req, res, next) => {
    const bookToDelete = req.params.id
    Books.findOne({ _id: req.params.id }).then((book) => {
        if (book.userId === req.auth.userId) {
            delete book
            console.log('deletion effectué')
            res.status(201).json({ message: 'deletion effectuée' })
        } else {
            console.log(
                "vous n'êtes pas authorisé à supprimer ce livre car vous n'être pas celui qui l'a enregistré"
            )
            res.status(403).json({
                message:
                    "vous n'êtes pas authorisé à supprimer ce livre car vous n'êtes pas celui qui l'a enregistré",
            })
        }
    })
}

//En cours de construction
exports.rateABook = (req, res, next) => {
    Books.findOne({ _id: req.params.id })
        .then((book) => {
            console.log('je suis rentré dans le findOne de rateaBook')
            if (
                book.rating.find((rating) => rating.userId === req.auth.userId)
            ) {
                console.log("l'utilisateur a déjà noté le livre")
                res.status(403).json({
                    message: "l'utilisateur à déjà noté le livre",
                })
            } else {
                console.log(book.rating)
                const newBookRatingObject = book.rating
                newBookRatingObject.push(req.body)
                Books.updateOne(
                    { _id: req.params.id },
                    { $set: { rating: newBookRatingObject } }
                )
                    .then(() => {
                        res.status(200)
                        Books.findOne({ _id: req.params.id }).then((book) => {
                            book
                        })
                    })
                    .catch((error) => res.status(400).json({ error }))
            }
        })
        .catch((error) => {
            console.log('Livre non trouvé')
            res.status(404).json({ message: error })
        })
}
