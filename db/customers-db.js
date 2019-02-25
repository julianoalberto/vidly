const debug = require('debug')('vidly:db:customers')
const mongoose = require('mongoose')

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

function save(customer) {
    return new Promise((resolve, reject) => {
        new Customer(customer)
        .save()
        .then((c) => {
            resolve(c)
        })
        .catch((err) => { reject(err)})
    })
}

function get() {
    return new Promise((resolve, reject) => {
        Customer
        .find()
        .sort('name')
        .then((c) => {
            resolve(c)
        })
        .catch((err) => { reject(err)})
    })
}

module.exports.save = save
module.exports.get = get