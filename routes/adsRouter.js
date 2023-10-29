const express = require('express')
const adsRouter = express.Router()
const adsModel = require('../models/ads')

// Get All Banners API
adsRouter.get('/', (req, res) => {

    adsModel.find({}).then(allAdsBanner => {
        res.send(allAdsBanner)
    })
})


module.exports = adsRouter