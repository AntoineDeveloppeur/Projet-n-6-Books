const jwt = require('jsonwebtoken')

// Si le token n'est pas bon, la requête s'arrête là. Du coup la fonction suivante comme rateABook n'est pas faîte. Pas besoin de vérifier à chaque fonction si l'utilisateur est connecté
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, 'Rmni%355bX3tPNUV*e(E')
        req.auth = { userId: decodedToken.userId }
        next()
    } catch (error) {
        console.log('erreur dans le auth.js')
        res.status(401).json({ error })
    }
}
