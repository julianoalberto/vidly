const debug = require('debug')('vidly:db:rentals')
const mongoose = require('mongoose')
const {Rental} = require('../models/rental')
const {Movie} = require('../models/movie')
const moviesDb = require('../db/movies')

function save(rental) {
    return Rental(rental).save()
}

function get() {
    return Rental.find().sort('-dateOut')        
}

function getById(id) {
    return Rental.findById(id)
}

function update(movie) {
    return Movie
        .findByIdAndUpdate(movie._id, movie, { new: true })
}

function deleteById(id) {
    return Movie.findByIdAndDelete(id)
}

module.exports.save = save
module.exports.get = get
module.exports.getById = getById
module.exports.update = update
module.exports.deleteById = deleteById