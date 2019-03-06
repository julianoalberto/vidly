const debug = require('debug')('vidly:db:movies')
const mongoose = require('mongoose')
const {Movie} = require('../models/movie')
const genresDb = require('./genres')

function save(movie) {
    return new Movie(movie).save()    
}

function get() {
    return Movie.find().sort('title')        
}

function getById(id) {
    return Movie.findById(id)
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