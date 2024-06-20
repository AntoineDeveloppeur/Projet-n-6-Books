const express = require('express')
const router = express.Router()
const bookCtrl = require('../controllers/book')

router.get('/', bookCtrl.getAllBooks)
router.get('/:id', bookCtrl.getABook)
router.get('/bestrating', bookCtrl.getBestRatings)
router.post('/', bookCtrl.postABook)
router.put('/:id', bookCtrl.modifyABook)
router.delete('/:id', bookCtrl.deleteABook)
router.post('/:id/rating', bookCtrl.rateABook)

module.exports = router
