const express = require('express')
const Joi = require('joi')

const app = express()
app.use(express.json())

// genres array
const genres = [
    {id: 1, genre: 'Drama'},
    {id: 2, genre: 'Comedy'},
    {id: 3, genre: 'Action'},
    {id: 4, genre: 'Adventure'},
    {id: 5, genre: 'Horror'}
]


// GET
app.get('/api/genres', (req, res) => {
    console.log('/api/genres')
    res.send(genres)
})

//GET by id
app.get('/api/genres/:id', (req, res) => {
    let id = req.params.id
    console.log(`/api/genres/${id}`)
    let genre = findGenre(id)
    if (!genre) return res.status(404).send(`Genre with ID ${id} not found.`)
    res.send(genre)
})

//POST
app.post('/api/genres', (req, res) => {
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
app.put('/api/genres/:id', (req, res) => {
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
        genre: Joi.string().min(3).max(20).required()
    }
    return Joi.validate(genre, schema)
}

const port = process.env.PORT || 3000
app.listen(3000)
console.log(`Listening on ${port}`)