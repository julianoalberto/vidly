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

function findGenre(id) {
    return genres.find(g => g.id === parseInt(id))
}

const port = process.env.PORT || 3000
app.listen(3000)
console.log(`Listening on ${port}`)