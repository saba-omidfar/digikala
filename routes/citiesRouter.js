const express = require('express')
const citiesRouter = express.Router()
const citiesModel = require('../models/Cities')

// Get All Users API
citiesRouter.get('/', (req, res) => {

    citiesModel.find({}).then(allProvinces => {
        res.send(allProvinces)
    })
})


module.exports = citiesRouter