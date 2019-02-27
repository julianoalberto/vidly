const debug = require('debug')('vidly:routes:customers')
const express = require('express')
const Joi = require('joi')
const customersDb = require('../db/customers')

const router = express.Router()

router.get('/', (req, res) => {
    customersDb
    .get()
    .then((customers) => {
        res.send(customers)
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })
})

router.get('/:id', (req, res) => {
    customersDb
    .getById(req.params.id)
    .then((customer) => {
        if (customer) res.send(customer)
        else res.status(404).send(`Customer with id ${req.params.id} not found.`)
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })
})

router.post('/', (req,res) => {
    const validation = validate(req.body)
    if (validation.error) 
        return res.status(400).send(validation.error.details[0].message)

    customersDb
    .save(validation.value)
    .then((savedCustomer) => {
        res.send(savedCustomer)
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })
})

router.put('/:id', (req, res) => {
    const validation = validate(req.body)
    if (validation.error)
        return res.status(400).send(validation.error.details[0].message)
    
    const customer = validation.value
    customer._id = req.params.id

    customersDb.update(customer)
    .then((updatedCustomer) => {
        if (updatedCustomer) res.send(updatedCustomer)
        else res.status(404).send(`Customer with id ${customer._id} not found.`)
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })
})

router.delete('/:id', (req, res) => {
    customersDb
    .deleteById(req.params.id)
    .then((c) => {
        if (c) res.send(c)
        else res.status(404).send(`Customer with id ${req.params.id} not found.`)        
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })
})

function validate(customer) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        isGold: Joi.boolean().default(false),
        phone: Joi.number().positive().max(99999999).required()
    }
    return Joi.validate(customer, schema)
}

module.exports = router