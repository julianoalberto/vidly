const mongoose = require('mongoose')
const {genreSchema} = require('./genre')
const Joi = require('joi')

const Movie = mongoose.model('Movie', mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },
    numberInStock: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },
    genre: {
        type: genreSchema,
        required: true
    }
}))

function validate(movie) {
    const schema = {
        title: Joi.string().min(3).max(50).required(),
        numberInStock: Joi.number().integer().min(0).default(0).required(),
        dailyRentalRate: Joi.number().precision(2).min(0).default(0).required(),
        genreId: Joi.objectId().required()
    }
    return Joi.validate(movie, schema)
}

module.exports.Movie = Movie
module.exports.validate = validate