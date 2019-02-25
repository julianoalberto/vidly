const debug = require('debug')('vidly:db:genres')
const mongoose = require('mongoose')

const Genre = mongoose.model('Genre', mongoose.Schema({
    genre: { 
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true
    }
}))

function saveGenre(newGenre) {
    return new Promise((resolve, reject) => {
        const savedGenre = new Genre({ genre: newGenre.genre })

        debug(`Saving: ${newGenre.genre}`)

        savedGenre
        .save()
        .then((savedGenre) => {
            debug(`Saved: ${savedGenre}`)
            resolve(savedGenre)
        })
        .catch((err) => { reject(err) })        
    })    
}

function updateGenre(newGenre) {
    return new Promise((resolve, reject) => {
        debug(`Updating ${newGenre._id}`)

        Genre
        .findById(newGenre._id)                
        .then((before) => {
            if(before) {
                debug(`Before ${before}`)
                before.genre = newGenre.genre
                
                before
                .save()
                .then((after) => {
                    debug(`After ${after}`)
                    resolve(after)
                })
            } else resolve()
        })
        .catch((err) => { reject(err) })        
    }) 
}

function getGenres() {
    return new Promise((resolve, reject) => {
        debug('Getting genres')

        Genre
        .find().sort('genre')
        .then((genres) => {
            debug(`Genres found: ${genres.length}`)
            resolve(genres)
        })
        .catch((err) => { reject(err) })
    })  
}

function getById(id) {
    return new Promise((resolve, reject) => {
        debug(`Getting genre by id ${id}`)

        Genre
        .findById(id)
        .then((genre) => {
            if (genre) debug(`Found genre ${genre}`)
            else debug(`Genre with id ${id} not found.`)
            resolve(genre)
        })
        .catch((err) => { reject(err) })
    })
}

function deleteById(id) {
    return new Promise((resolve, reject) => {
        Genre
        .findByIdAndDelete(id)
        .then((deletedGenre) => {
            resolve(deletedGenre)
        })
        .catch((err) => { reject(err) })
    })
}

module.exports.saveGenre = saveGenre
module.exports.updateGenre = updateGenre
module.exports.getGenres = getGenres
module.exports.getById = getById
module.exports.deleteById = deleteById