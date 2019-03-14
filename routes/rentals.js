const debug = require('debug')('vidly:routes:rentals')
const {validate} = require('../models/rental')
const moviesDb = require('../db/movies')
const customersDb = require('../db/customers')
const rentalsDb = require('../db/rentals')
const express = require('express')
const {Rental} = require('../models/rental')
const {Movie} = require('../models/movie')

const router = express.Router()

router.get('/', (req, res) => {
    rentalsDb.get()
    .then((rentals) => {
        res.send(rentals)
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })
})

router.get('/:id', (req, res) => {
    rentalsDb.getById(req.params.id)
    .then((rental) => {
        if (rental) return res.send(rental)
        else return res.status(404).send(`Rental with id ${req.params.id} not found.`)
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })
})

router.post('/', (req,res) => {
    const validation = validate(req.body)
    if (validation.error)
        return res.status(400).send(validation.error.details[0].message)

    moviesDb
    .getById(validation.value.movieId)
    .then((movie) => {
        if (!movie)
            return res.status(400).send(`Movie with id ${validation.value.movieId} not found.`)
        
        if (movie.numberInStock < 1)
            return res.status(400).send(`Movie with id ${validation.value.movieId} is out of stock.`)

        customersDb.getById(validation.value.customerId)
        .then((customer) => {
            if (!customer)
                return res.status(400).send(`Customer with id ${validation.value.movieId} not found.`)
            
            const rental = new Rental({
                customer: {
                    _id: customer._id,
                    isGold: customer.isGold
                },
                movie: {
                    _id: movie._id,
                    title: movie.title,
                    dailyRentalRate: movie.dailyRentalRate
                }
            })
            rentalsDb.save(rental)
            .then((savedRental) => {
                movie.numberInStock--
                moviesDb.update(movie)
                .then((savedMovie) => {
                    debug(savedMovie)
                })
                res.send(savedRental)
            })            
        })
        .catch((err) => {
            return res.status(500).send(err.message)
        })
    })
    .catch((err) => {
        return res.status(500).send(err.message)
    })
})

router.put('/:id', (req, res) => {
    return res.send(`PUT rentals ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
    return res.send(`DELETE rentals ${req.params.id}`)
})

module.exports = router