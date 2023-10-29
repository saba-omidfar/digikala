const express = require('express')
const HeaderSliderRouter = express.Router()
const HeaderSliderModel = require('../models/header-slider')

// Get All Users API
HeaderSliderRouter.get('/', (req, res) => {

    HeaderSliderModel.find({}).then(HeaderSliders => {
        res.send(HeaderSliders)
    })
})


module.exports = HeaderSliderRouter