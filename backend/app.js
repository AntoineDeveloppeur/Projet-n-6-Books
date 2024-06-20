const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb')
const user = require('./routes/User')
const userRoutes = require('./routes/User')
const bookRoutes = require('./routes/Book')

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000', // Adjust this to match your frontend's origin
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
}
const app = express()

app.use(cors(corsOptions))

// Handle preflight OPTIONS request
app.options('*', cors(corsOptions))

app.use(express.json())

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
//     )
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'GET, POST, PUT, DELETE, PATCH, OPTIONS'
//     )
//     next()
// })

// mongoose
//     .connect(
//         'mongodb+srv://antoineverove:TPKIpIN61zJvWmp5@antoineserver.fndalaw.mongodb.net/?retryWrites=true&w=majority&appName=Antoineserver',
//         { useNewUrlParser: true, useUnifiedTopology: true }
//     )
//     .then(() => console.log('Connexion à MongoDB réussie !'))
//     .catch(() => console.log('Connexion à MongoDB échouée !'))

const uri =
    'mongodb+srv://antoineverove:TPKIpIN61zJvWmp5@antoineserver.fndalaw.mongodb.net/?retryWrites=true&w=majority&appName=Antoineserver'
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect()
        // Send a ping to confirm a successful connection
        await client.db('admin').command({ ping: 1 })
        console.log(
            'Pinged your deployment. You successfully connected to MongoDB!'
        )
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close()
    }
}
run().catch(console.dir)

module.exports = app

/*
 *
 * fin configuration de connection à la base de donnée
 *
 */

// Il faut ajouter la requête nécessaire pour montrer les livres
app.use('/api/books', bookRoutes)

app.use('/api/auth', userRoutes)
