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
        genreId: Joi.string().required()
    }
    return Joi.validate(movie, schema)
}


// var portSchema = Joi.number().integer().min(0).max(65535);
// var configSchema = Joi.object({
//     bindhost: Joi.string().required(),
//     port: portSchema.required(),
//     endpoints: Joi.object({
//         "/": Joi.string().required(),
//         "/customers": Joi.string().default("customersHandler").optional()
//     }),
//     database: Joi.object({
//         host: Joi.string().required(),
//         name: Joi.string().token().max(20),
//         port: portSchema.default(5050).optional()
//     })
// });

module.exports.Movie = Movie
module.exports.validate = validate