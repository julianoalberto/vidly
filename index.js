const genres = require('./routes/genres')
const home = require('./routes/home')
const express = require('express')

const app = express()
app.use(express.json())

app.use('/api/genres', genres)
app.use('/', home)

app.set('views', './views')
app.set('view engine', 'pug')

const port = process.env.PORT || 3000

app.listen(3000)
console.log(`Listening on ${port}`)