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
            const user = new User({
                email: req.body.email,
                password: hash,
            })
            console.log(user)
            user.save()
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

exports.login = (req, res, next) => {}
