const debug = require('debug')('genres:routes:genres')
const joi = require('joi')
const express = require('express')
const router = express.Router()

const genresDb = require('../db/genres-db')
genresDb.connect()

// GET
router.get('/', (req, res) => {
    genresDb
    .getGenres()
    .then((genres) => {
        if (genres && genres.length > 0) res.send(genres)               
        else res.status(404).send('No genres found.')
    })
    .catch((err) => {
        res.status(500).send(err.message)            
    })
})

//GET by id
router.get('/:id', (req, res) => {
    let id = req.params.id
    genresDb
    .getById(id)
    .then((genre) => {
        if (genre) res.send(genre)
        else res.status(404).send(`Genre with id ${id} not found.`)
    })
    .catch((err) => {
        res.status(500).send(`Error getting genre with id ${id}: ${err.message}`)
    })
})

//POST
router.post('/', (req, res) => {
    let validation = validateGenre(req.body)
    if (validation.error) return res.status(400).send(validation.error.details[0].message)

    genresDb
    .saveGenre({ 
        genre: req.body.genre 
    })
    .then((genre) => {
        res.send(genre)
    })
    .catch((err) => {
        res.status(500).send(`Error saving genre: ${err.message}`)
    })    
})

//DELETE
router.delete('/:id', (req, res) => {
    genresDb
    .deleteById(req.params.id)
    .then((deletedGenre) => {
        debug(deletedGenre)
        if (deletedGenre) res.send(deletedGenre)
        else res.status(404).send(`Genre with id ${req.params.id} not found to delete.`)
    })
    .catch((err) => {
        res.status(500).send(`Error deleting genre with id ${req.params.id}: ${err.message}`)
    })
})

//PUT
router.put('/:id', (req, res) => {
    const genre = { 
        genre: req.body.genre
    }
    const validation = validateGenre(genre)
    if (validation.error) return res.status(400).send(validation.error.details[0].message)
    
    genre._id = req.params.id

    genresDb
    .updateGenre(genre)
    .then((updatedGenre) => {
        if (updatedGenre) res.send(updatedGenre)
        else res.status(404).send(`Genre with id ${req.params.id} not found to update.`)
    })
    .catch((err) => {
        res.status(500).send(`Error updating genre with id ${req.params.id}: ${err.message}`)
    })
})

function validateGenre(genre) {
    let schema = {
        genre: joi.string().min(3).max(20).required()
    }
    return joi.validate(genre, schema)
}

module.exports = router