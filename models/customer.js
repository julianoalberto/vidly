const mongoose = require('mongoose')
const Joi = require('joi')

const Customer = mongoose.model('Customer', mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },
    isGold: {
        type: Boolean,
        required: true        
    },
    phone: {
        type: Number,
        required: true,
        max: 99999999
    }
}))

function validate(customer) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        isGold: Joi.boolean().default(false),
        phone: Joi.number().positive().max(99999999).required()
    }
    return Joi.validate(customer, schema)
}

module.exports.Customer = Customer
module.exports.validate = validate