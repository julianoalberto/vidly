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