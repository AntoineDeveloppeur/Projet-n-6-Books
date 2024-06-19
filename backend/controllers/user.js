const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.signup = (req, res, next) => {
    console.log('je suis dans signup', req.body.password)
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new UserSchema({
                email: req.email,
                password: hash,
            })
            user.save()
                .then(() =>
                    res.status(201).json({ message: 'utilisateur enregistré' })
                )
                .catch((error) => res.status(400).json({ message: error }))
        })
        .catch((error) => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {}
