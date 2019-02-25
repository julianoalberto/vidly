const debug = require('debug')('vidly:routes:customers')
const express = require('express')
const Joi = require('joi')
const customersDb = require('../db/customers-db')

const router = express.Router()

router.get('/', (req, res) => {
    customersDb
    .get()
    .then((c) => {
        if(c)
            res.send(c)
        else 
            res.status(404).send('No customers found.')
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })
})

router.get('/:id', (req, res) => {
    res.send(`get /customers/${req.params.id}`)
})

router.post('/', (req,res) => {
    const validation = validate(req.body)
    if(validation.error) 
        return res.status(400).send(validation.error.details[0].message)

    customersDb
    .save(validation.value)
    .then((c) => {
        res.send(c)
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })
})

router.put('/', (req, res) => {
    res.send('put /customers')
})

router.delete('/:id', (req, res) => {
    res.send(`delete /customers/${req.params.id}`)
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