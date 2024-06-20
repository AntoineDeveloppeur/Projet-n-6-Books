const bcrypt = require('bcrypt')
const User = require('../models/user')

// exports.signup = (req, res, next) => {
//     console.log('je suis dans signup', req.body.password)
//     const objet = { objet: 'objet' }

//     objet
//         .save()
//         .then(() => res.status(201).json({ message: 'utilisateur enregistré' }))
//         .catch((error) => {
//             console.log('error dans le save')
//             res.status(408).json({ message: error })
//         })

//         .catch((error) => {
//             console.log('erreur dans le catch de hash')
//             res.status(503).json({ error })
//         })
// }

exports.signup = (req, res, next) => {
    console.log('je suis dans signup', req.body.password)
    bcrypt
        .hash(req.body.password, 1)
        .then((hash) => {
            console.log(hash)
            const userbook = new User({
                email: req.body.email,
                password: hash,
            })
            console.log(userbook)
            userbook
                .save()
                .then(() =>
                    res.status(201).json({ message: 'utilisateur enregistré' })
                )
                .catch((error) => {
                    console.log('error dans le save')
                    res.status(408).json({ error })
                })
        })
        .catch((error) => {
            console.log('erreur dans le catch de hash')
            res.status(503).json({ error })
        })
}

exports.login = (req, res, next) => {
    console.log('je suis dans la fonction login')
    User.findOne({ email: req.body.email })
        .then((user) => {
            console.log('je suis dans le then du findone')
            if (user === null) {
                console.log('lutilisateur nexistepas')
                res.status(401).json({ message: 'utilisateur non trouvé' })
            } else {
                console.log('lutilisateur existe')
                if (req.body.password === user.password) {
                    console.log('le password est correct')
                    res.status(200).json({ message: 'mot de passe correct' })
                } else {
                    console.log('le password est incorrect')
                    res.status(400).json({ message: 'mot de passe incorrect' })
                }
            }
        })
        .catch((error) => {
            console.log('je suis dans le catch de findOne')
            res.status(500).json({ error })
        })
}
