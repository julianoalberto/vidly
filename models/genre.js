const mongoose = require('mongoose')
const Joi = require('joi')

const Genre = mongoose.model('Genre', mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true
    }
}))

function validate(genre) {
    const schema = {
        name: Joi.string().min(3).max(20).required()
    }
    return Joi.validate(genre, schema)
}

module.exports.Genre = Genre
module.exports.validate = validate
module.exports.genreSchema = Genre.schema