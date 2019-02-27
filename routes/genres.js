const debug = require('debug')('vidly:routes:genres')
const Joi = require('joi')
const express = require('express')
const router = express.Router()

const genresDb = require('../db/genres')

router.get('/', (req, res) => {
    genresDb
    .get()
    .then((genres) => {
        res.send(genres)
    })
    .catch((err) => {
        res.status(500).send(err.message)            
    })
})

router.get('/:id', (req, res) => {
    genresDb
    .getById(req.params.id)
    .then((genre) => {
        if (genre) res.send(genre)
        else res.status(404).send(`Genre with id ${req.params.id} not found.`)
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })
})

router.post('/', (req, res) => {
    const validation = validate(req.body)
    if (validation.error) return res.status(400).send(validation.error.details[0].message)

    genresDb
    .save(validation.value)
    .then((savedGenre) => {
        res.send(savedGenre)
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })    
})

router.put('/:id', (req, res) => {
    const validation = validate(req.body)
    if (validation.error) return res.status(400).send(validation.error.details[0].message)
    
    const genre = validation.value
    genre._id = req.params.id

    genresDb
    .update(genre)
    .then((updatedGenre) => {
        if (updatedGenre) res.send(updatedGenre)
        else res.status(404).send(`Genre with id ${genre._id} not found to update.`)
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })
})

router.delete('/:id', (req, res) => {
    genresDb
    .deleteById(req.params.id)
    .then((deletedGenre) => {
        if (deletedGenre) res.send(deletedGenre)
        else res.status(404).send(`Genre with id ${req.params.id} not found to delete.`)
    })
    .catch((err) => {
        res.status(500).send(`Error deleting genre with id ${req.params.id}: ${err.message}`)
    })
})

function validate(genre) {
    const schema = {
        name: Joi.string().min(3).max(20).required()
    }
    return Joi.validate(genre, schema)
}

module.exports = router