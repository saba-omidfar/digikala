const express = require('express')
const productsRouter = express.Router()
const productsModel = require('../models/Products')
const commentModel = require('../models/Comments')
const usersModel = require('../models/Users')
const userProductViewModel = require('../models/userProductView')
const categoriesModel = require('../models/Categories')
const megaMenusModel = require('../models/MegaMenus')

// Get All Products API
productsRouter.get('/products', (req, res) => {

    productsModel.find()
        .populate("comments")
        .populate('creator')
        .lean()
        .then(products => {

            if (!products) {
                return res.status(404).json({ message: "No Product Available!" })
            }

            let allProducts = []
            products.forEach(product => {
                allProducts.push({
                    ...product,
                    categoryID: product.categoryID
                })
            })

            res.send(allProducts)
        })
})

//get one product details
productsRouter.get('/product/name/:name', async (req, res) => {

    try {

        const product = await productsModel.findOne({ shortName: req.params.name })
            .populate({
                path: "categoryID",
                model: categoriesModel
            })
            .populate({
                path: "submenuID",
                model: megaMenusModel
            })
            .populate({
                path: "subSubmenu",
                model: megaMenusModel
            })
            .populate("creator")
            .lean()

        if (!product) {
            return res.status(404).json({ message: "no product found!" })
        }

        const allComments = await commentModel
            .find({ product: product._id })
            .populate("creator")
            .lean()

        let comments = []
        if (allComments.length !== 0) {
            allComments.forEach(comment => {
                let mainCommentAnswerInfo = null
                allComments.forEach((answerComment) => {
                    if (String(comment._id) == String(answerComment.mainCommentID)) {
                        mainCommentAnswerInfo = { ...answerComment }
                    }
                })

                if (!comment.mainCommentID) {
                    comments.push({
                        ...comment,
                        product: comment.product._id,
                        answerContent: mainCommentAnswerInfo,
                    })
                }
            })
        }

        res.send({
            ...product,
            comments: comments
        })
    } catch (err) {
        res.status(400).json({ error: 'Error finding product', message: err.message })
    }
})

//get one product details By ID
productsRouter.get('/product/id/:id', async (req, res) => {

    try {

        const product = await productsModel.findById(req.params.id)
            .populate({
                path: "categoryID",
                model: categoriesModel
            })
            .populate({
                path: "submenuID",
                model: megaMenusModel
            })
            .populate({
                path: "subSubmenu",
                model: megaMenusModel
            })
            .populate("creator")
            .lean()

        if (!product) {
            return res.status(404).json({ message: "no product found!" })
        }

        const allComments = await commentModel
            .find({ product: product._id })
            .populate("creator")
            .lean()

        let comments = []
        if (allComments.length !== 0) {
            allComments.forEach(comment => {
                let mainCommentAnswerInfo = null
                allComments.forEach((answerComment) => {
                    if (String(comment._id) == String(answerComment.mainCommentID)) {
                        mainCommentAnswerInfo = { ...answerComment }
                    }
                })

                if (!comment.mainCommentID) {
                    comments.push({
                        ...comment,
                        product: comment.product._id,
                        answerContent: mainCommentAnswerInfo,
                    })
                }
            })
        }

        res.send({
            ...product,
            comments: comments
        })
    } catch (err) {
        res.status(400).json({ error: 'Error finding product', message: err.message })
    }
})

productsRouter.get('/product/id/:id/user/:userID', async (req, res) => {

    try {
        const { id, userID } = req.params

        const product = await productsModel.findById(id)
            .populate({
                path: "categoryID",
                model: categoriesModel
            })
            .populate("creator")
            .lean()

        const user = await usersModel.findOne({ userID })

        // create a new UserProductView document
        const userProductView = new userProductViewModel({ user: user._id, product: product._id })
        await userProductView.save()

        if (!product) {
            return res.status(404).json({ message: "no product found!" })
        }

        res.send(product)
    } catch (err) {
        res.status(400).json({ error: 'Error finding product', message: err.message })
    }
})

// Record the Product Object As Successful And Save The Product Object To The Store
productsRouter.post('/product/product-view', async (req, res) => {

    const user = await usersModel.findOne({ _id: req.body.userID })
    const product = await productsModel.findOne({ shortName: req.body.productShortName })

    // Check if the user and product exist
    if (!user || !product) {
        return res.status(404).send('User or product not found');
    }

    // Check if the user has already viewed this product
    const existingView = await userProductViewModel.findOne({ userID: user._id, product: product._id })

    if (!existingView) {
        // If not, create a new UserProductView document
        const userProductView = new userProductViewModel({ userID: user._id, product: product._id })
        await userProductView.save()
    }
    res.sendStatus(200)
})

// Get All Incredible Offers API
productsRouter.get('/incridble-offers', async (req, res) => {

    productsModel.find({ discount: { $gt: 50 }, stock: { $gt: 100 } }).then(product => {
        res.send(product)
    })
})

// Select a color for a product
productsRouter.post('/product/selectColor', async (req, res) => {
    const { productId, selectedColor } = req.body;

    try {
        // Find the product and replace the selected color in the selectedColors array
        const product = await productsModel.findByIdAndUpdate(productId, { selectedColors: [selectedColor] }, { new: true });

        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }

        res.json({ message: 'Color selected successfully', product: product });
    } catch (err) {
        res.status(500).json({ error: 'Error selecting color', message: err.message });
    }
})

// Get similar products
productsRouter.get('/product/:id/similar', async (req, res) => {
    try {
        // Find the product
        const product = await productsModel.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: "Product not found!" })
        }

        // Find other products in the same category
        const similarProducts = await productsModel.find({ categoryID: product.categoryID, _id: { $ne: product._id } }).limit(10)

        // Send the similar products
        res.json(similarProducts)
    } catch (err) {
        res.status(500).json({ error: 'Error finding similar products', message: err.message })
    }
})

// Get Products By Category Name
productsRouter.get('/products/:categoryName', async (req, res) => {
    try {
        const category = await categoriesModel.findOne({ title: req.params.categoryName })

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const products = await productsModel.find({ categoryID: category._id })
        res.json(products)
    } catch (err) {
        res.status(500).json({ error: 'Error finding products by category', message: err.message })
    }
})

// Get Products By Category Name
productsRouter.get('/products/subCategory/:categoryName', async (req, res) => {
    try {
        
        const category = await megaMenusModel.findOne({ href: req.params.categoryName })

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const products = await productsModel.find({ subSubmenu: category._id })
        res.json(products)
    } catch (err) {
        res.status(500).json({ error: 'Error finding products by category', message: err.message })
    }
})

// Get Products By Submenu ID
productsRouter.get('/products/submenu/:submenuID', async (req, res) => {
    try {
        const products = await productsModel.find({ submenuID: req.params.submenuID })
        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found for this submenuID' });
        }
        res.json(products)
    } catch (err) {
        res.status(500).json({ error: 'Error finding products by submenuID', message: err.message })
    }
})

module.exports = productsRouter