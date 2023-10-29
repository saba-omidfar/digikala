const express = require('express')
const digikalaServicesRouter = express.Router()
const digikalaServicesModel = require('../models/digikala-services')

// Get All Users API
digikalaServicesRouter.get('/', (req, res) => {

    digikalaServicesModel.find({}).then(services => {
        res.send(services)
    })
})


module.exports = digikalaServicesRouter