const express = require('express')
const userProductsView = express.Router()
const userProductViewModel = require('../models/userProductView')
const basketModel = require('../models/basket')

// Get All Product Viewd By User API
userProductsView.get('/:userID/recently-viewed', async (req, res) => {

    const { userID } = req.params

    // find the recently viewed products
    const recentlyViewed = await userProductViewModel
        .find({ userID: userID })
        .sort({ viewedAt: -1 })
        .limit(10) // adjust this number as needed
        .populate('product') // this will replace product IDs with actual product documents

    // Fetch the user's basket
    const basket = await basketModel.findOne({ userID: userID })

    // Filter out the products that are already in the user's basket
    const filteredRecentlyViewed = recentlyViewed.filter(view => {
        // Check if basket and basket.products are not null or undefined before calling some()
        return !(basket && basket.products && basket.products.some(basketProduct => basketProduct._id.equals(view.product._id)))
    })

    // Create an object that includes the user ID and the recently viewed products
    const response = {
        userID: userID,
        recentlyViewed: filteredRecentlyViewed
    }

    res.json(response)
})

module.exports = userProductsView