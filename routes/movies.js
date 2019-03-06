const debug = require('debug')('vidly:routes:movies')
const {validate} = require('../models/movie')
const moviesDb = require('../db/movies')
const genresDb = require('../db/genres')
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    moviesDb
    .get()
    .then((movies) => {
        res.send(movies)
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })
})

router.get('/:id', (req, res) => {
    moviesDb
    .getById(req.params.id)
    .then((movie) => {
        if (movie) res.send(movie)
        else res.status(404).send(`Movie with id ${req.params.id} not found.`)
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })
})

router.post('/', (req,res) => {
    const validation = validate(req.body)
    if (validation.error) 
        return res.status(400).send(validation.error.details[0].message)

    const movie = validation.value

    genresDb
    .getById(movie.genreId)
    .then((genre) => {
        if(genre) {
            movie.genre = {
                _id: genre._id,
                name: genre.name
            }
            delete movie.genreId
            
            moviesDb.save(movie)
            .then((savedMovie) => {
                res.send(savedMovie)
            })
            .catch((err) => {
                res.status(500).send(err.message)
            })
        }
        else return res.status(404).send(`Genre with id ${movie.genreId} not found.`)
    })    
})

router.put('/:id', (req, res) => {
    const validation = validate(req.body)
    if (validation.error)
        return res.status(400).send(validation.error.details[0].message)
    
    const movie = validation.value
    movie._id = req.params.id

    moviesDb.update(movie)
    .then((updatedMovie) => {
        if (updatedMovie) res.send(updatedMovie)
        else res.status(404).send(`Movie with id ${movie._id} not found.`)
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })
})

router.delete('/:id', (req, res) => {
    moviesDb
    .deleteById(req.params.id)
    .then((movie) => {
        if (movie) res.send(movie)
        else res.status(404).send(`Movie with id ${req.params.id} not found.`)        
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })
})

module.exports = router