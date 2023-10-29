const express = require('express')
const popularBrandsRouter = express.Router()
const popularBrandsModel = require('../models/popular-brands')

// Get All Users API
popularBrandsRouter.get('/', (req, res) => {

    popularBrandsModel.find({}).then(popularBrands => {
        res.send(popularBrands)
    })
})


module.exports = popularBrandsRouter