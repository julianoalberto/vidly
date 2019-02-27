const mongoose = require('mongoose')

const Genre = mongoose.model('Genre', mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true
    }
}))

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