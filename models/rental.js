const mongoose = require('mongoose')
const Joi = require('joi')

const Rental = mongoose.model('Rental', mongoose.Schema({
    movie: {
        type: mongoose.Schema({
            _id: { 
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            dailyRentalRate: {
                type: Number,
                min: 0,
                required: true
            }
        }),
        required: true
    },
    customer: {
        type: mongoose.Schema({
            _id: { 
                type: String,
                required: true
            },
            isGold: {
                type: Boolean,
                required: true        
            }
        }),
        required: true
    },
    dateOut: {
        type: Date, 
        default: Date.now
    },
    returnDate: {
        type: Date
    }
}))

function validate(rental) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    }
    return Joi.validate(rental, schema)
}

module.exports.Rental = Rental
module.exports.validate = validate