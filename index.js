const debug = require('debug')('vidly:index')
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const home = require('./routes/home')
const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

connect()

const app = express()
app.use(express.json())

app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/', home)

app.set('views', './views')
app.set('view engine', 'pug')

const port = process.env.PORT || 3000

app.listen(3000)
debug(`Listening on ${port}`)

function connect() {
    const connectionString = config.get('database.connectionString')
    return new Promise((resolve, reject) => {
        mongoose
        .connect(connectionString)
        .then(() => {
            debug(`Connected to ${connectionString}.`)
            resolve()
        })
        .catch((err) => {
            debug(`Error connnecting to ${connectionString}:`)
            debug(err.message)
            reject(err)
        })
    })
}