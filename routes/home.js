const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('home', {title: 'Vidly API', message: 'Vidly API reference', text: 'This API is used for vidly app'})
})

module.exports = router