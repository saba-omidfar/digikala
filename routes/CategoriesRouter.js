const express = require('express')
const categoriesRouter = express.Router()
const categoriesModel = require('../models/Categories')
const megaMenusModel = require('../models/MegaMenus')

// Get All Categories and SubCategories API
categoriesRouter.get('/', async (req, res) => {

    const categories = await categoriesModel.find({}).lean()

    if (categories.length === 0) {
        return res.status(404).json({ message: "No Category Available!" });
    }

    return res.json(categories)
})

// Get Category by ID API
categoriesRouter.get('/:id', async (req, res) => {

    const categoryID = req.params.id

    const category = await megaMenusModel.findById(categoryID).lean()

    if (!category) {
        return res.status(404).json({ message: "Category not found!" })
    }

    // Find submenus
    const submenus = await megaMenusModel.find({ parent: categoryID }).lean()
    category.submenus = submenus

    return res.json(category)
})

module.exports = categoriesRouter