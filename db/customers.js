const mongoose = require('mongoose')
const {Customer} = require('../models/customer')

function save(customer) {
    return new Customer(customer).save()
}

function get() {
    return Customer.find().sort('name')        
}

function getById(id) {
    return Customer.findById(id)
}

function update(customer) {
    return Customer
        .findByIdAndUpdate(customer._id, customer, { new: true })
}

function deleteById(id) {
    return Customer.findByIdAndDelete(id)
}

module.exports.save = save
module.exports.get = get
module.exports.getById = getById
module.exports.update = update
module.exports.deleteById = deleteById