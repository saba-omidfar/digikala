const express = require('express')
const basketRouter = express.Router()
const basketModel = require('./../models/basket')
const productsModel = require('./../models/Products')

basketRouter.get('/:userID', (req, res) => {

    basketModel.find({ userID: req.params.userID })
        .populate('Products.product')
        .then(basket => {
            res.send(basket)
        })
})

basketRouter.post('/:userID', async (req, res) => {

    const { userID } = req.params
    let product = req.body

    try {
        // check if a basket already exists for the user
        let basket = await basketModel.findOne({ userID }).populate('Products.product')

        if (!basket) {
            console.log('no basket');
            // if no basket exists for the user, create a new one
            await productsModel.findOneAndUpdate(
                { _id: product._id },
                { $set: { isUserBuyThisProduct: true } },
                { new: true })
            basket = await basketModel.create({ userID, Products: [{ product: product._id, quantity: 1 }] })
            basket = await basket.populate('Products.product')

        } else {

            // check if the product is already in the basket
            const exitingProduct = basket.Products.find(p => {
                return String(p.product._id) == (product._id)
            })

            if (exitingProduct) {
                // increment the count if the product is already in the basket
                await productsModel.findOneAndUpdate(
                    { _id: product._id },
                    { $inc: { stock: -1 }, $set: { isUserBuyThisProduct: true } },
                    { new: true })
                exitingProduct.quantity++
            } else {
                // add the product to the exiting basket with quantity 1
                await productsModel.findOneAndUpdate(
                    { _id: product._id },
                    { $inc: { stock: -1 }, $set: { isUserBuyThisProduct: true } },
                    { new: true })
                basket.Products.push({ product: product._id, quantity: 1 })
                basket = await basket.populate('Products.product')
            }

            // save the upadted basket
            basket = await basket.save()
        }

        res.status(200).json(basket)
    } catch (err) {
        res.status(400).json({ Message: err.message })
    }
})

// Route for creating a new basket for a user
basketRouter.post('/create/:userID', async (req, res) => {
    const { userID } = req.params

    try {
        // Check if a basket already exists for the user
        let basket = await basketModel.findOne({ userID })

        if (basket) {
            res.status(400).json({ Message: "Basket already exists for this user" })
        } else {
            // Create a new basket for the user
            basket = await basketModel.create({ userID, Products: [] })
            res.status(200).json(basket)
        }
    } catch (err) {
        res.status(400).json({ Message: err.message })
    }
})

// Route for adding a product to a user's basket
basketRouter.post('/:userID', async (req, res) => {
    const { userID } = req.params;
    let product = req.body;

    try {
        let basket = await basketModel.findOne({ userID }).populate('Products.product')

        if (!basket) {
            basket = await basketModel.create({ userID, Products: [{ product: product._id, quantity: 1, isUserBuyThisProduct: true }] });
        } else {
            const existingProduct = basket.Products.find(p => String(p.product._id) == product._id);

            if (existingProduct) {
                existingProduct.quantity++
                existingProduct.isUserBuyThisProduct = true
            } else {
                basket.Products.push({ product: product._id, quantity: 1, isUserBuyThisProduct: true });
            }

            basket = await basket.save()
        }

        res.status(200).json(basket)
    } catch (err) {
        res.status(400).json({ Message: err.message })
    }
})

basketRouter.patch('/:userID/:productID', async (req, res) => {

    const { userID, productID } = req.params

    try {
        // Find the user's basket
        let basket = await basketModel.findOne({ userID }).populate('Products.product');

        if (!basket) {
            res.status(404).json({ Message: "No basket found for this user" });
        } else {
            // Find the product in the basket
            const existingProduct = basket.Products.find(p => String(p.product._id) == productID)

            if (existingProduct) {
                // Decrease the quantity of the product if it's more than 1
                if (existingProduct.quantity > 1) {
                    existingProduct.quantity--;
                    await productsModel.findOneAndUpdate(
                        { _id: productID },
                        { $inc: { stock: 1 }, $set: { isUserBuyThisProduct: true } },
                        { new: true }
                    );
                } else {
                    // Remove the product from the basket if the quantity is 1
                    basket.Products = basket.Products.filter(p => String(p.product._id) != productID);
                    await productsModel.findOneAndUpdate(
                        { _id: productID },
                        { $set: { isUserBuyThisProduct: false } },
                        { new: true }
                    );
                }

                // Save the updated basket
                basket = await basket.save();
                res.status(200).json(basket);
            } else {
                res.status(404).json({ Message: "No such product in the basket" });
            }
        }
    } catch (err) {
        res.status(400).json({ Message: err.message });
    }
})

basketRouter.delete('/:userID/:productID', async (req, res) => {
    const { userID, productID } = req.params;

    try {
        // Find the user's basket
        let basket = await basketModel.findOne({ userID }).populate('Products.product');

        if (!basket) {
            res.status(404).json({ Message: "No basket found for this user" });
        } else {
            // Find the product in the basket
            const existingProduct = basket.Products.find(p => String(p.product._id) == productID);

            if (existingProduct) {
                // Remove the product from the basket
                basket.Products = basket.Products.filter(p => String(p.product._id) !== productID);
                await productsModel.findOneAndUpdate(
                    { _id: productID },
                    { $inc: { stock: 1 }, $set: { isUserBuyThisProduct: false } },
                    { new: true }
                )

                // Save the updated basket
                basket = await basket.save()
                res.status(200).json(basket)
            } else {
                res.status(404).json({ Message: "No such product in the basket" });
            }
        }
    } catch (err) {
        res.status(400).json({ Message: err.message });
    }
})

// Delete All Products From User Basket
basketRouter.delete('/:userID', async (req, res) => {

    const { userID } = req.params;

    try {
        // Find the user's basket
        let basket = await basketModel.findOne({ userID }).populate('Products.product')

        if (!basket) {
            res.status(404).json({ Message: "No basket found for this user" })
        } else {
            // Loop through all the products in the basket
            for (let i = 0; i < basket.Products.length; i++) {
                 
                let productID = basket.Products[i].product._id

                // Update the product's stock and isUserBuyThisProduct flag
                await productsModel.findOneAndUpdate(
                    { _id: productID },
                    { $inc: { stock: basket.Products[i].quantity }, $set: { isUserBuyThisProduct: false } },
                    { new: true }
                )
            }

            // Empty the basket
            basket.Products = []
            await basket.save()

            res.status(200).json({ Message: "Basket emptied successfully" })
        }
    } catch (err) {
        res.status(400).json({ Message: err.message })
    }
})

module.exports = basketRouter