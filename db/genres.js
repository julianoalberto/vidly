const mongoose = require('mongoose')
const {Genre} = require('../models/genre')

function get() {
    return Genre.find().sort('name')
}

function getById(id) {
    return Genre.findById(id)
}

function save(genre) {
    return new Genre(genre).save()
}

function update(genre) {
    return Genre.findByIdAndUpdate(genre._id, genre, { new: true })
}

function deleteById(id) {
    return Genre.findByIdAndDelete(id)
}

module.exports.save = save
module.exports.update = update
module.exports.get = get
module.exports.getById = getById
module.exports.deleteById = deleteById