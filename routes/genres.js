const joi = require('joi')
const express = require('express')
const router = express.Router()

// genres array
const genres = [
    {id: 1, genre: 'Drama'},
    {id: 2, genre: 'Comedy'},
    {id: 3, genre: 'Action'},
    {id: 4, genre: 'Adventure'},
    {id: 5, genre: 'Horror'}
]


// GET
router.get('/', (req, res) => {
    res.send(genres)
})

//GET by id
router.get('/:id', (req, res) => {
    let id = req.params.id
    let genre = findGenre(id)
    if (!genre) return res.status(404).send(`Genre with ID ${id} not found.`)
    res.send(genre)
})

//POST
router.post('/', (req, res) => {
    console.log(req.body)
    
    let result = validateGenre(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    const course = {
        id: genres.length + 1,
        genre: req.body.genre
    }
    genres.push(course)
    res.send(course)
})

//PUT
router.put('/:id', (req, res) => {
    console.log(req.params.id, req.body)
    
    let genre = findGenre(req.params.id)
    if (!genre) return res.status(404).send(`Genre with ID ${req.params.id} not found.`)

    let result = validateGenre(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    genres.splice(genres.indexOf(genre), 1)
    genre.genre = req.body.genre
    genres.push(genre)
    res.send(genre)
})

function findGenre(id) {
    return genres.find(g => g.id === parseInt(id))
}

function validateGenre(genre) {
    let schema = {
        genre: joi.string().min(3).max(20).required()
    }
    return joi.validate(genre, schema)
}

module.exports = router