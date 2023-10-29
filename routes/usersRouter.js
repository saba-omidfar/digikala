const express = require('express')
const usersRouter = express.Router()
const UserModel = require('./../models/Users')
const userProductsModel = require('./../models/user-products')

// Get All Users API
usersRouter.get('/', (req, res) => {

    UserModel.find({}).then(allUsers => {
        res.send(allUsers)
    })
})

// Get User By Phone Number
usersRouter.get('/phone', (req, res) => {

    userPhone = req.headers.authorization

    UserModel.find({ phone: `${userPhone}` }).then(mainUser => {
        res.send(mainUser)
    })
})

// Delete Main User
usersRouter.delete('/', (req, res) => {

    let userID = req.headers.authorization

    UserModel.findByIdAndDelete(userID).then(result => {
        console.log(result)
        res.send(true)
    })

})

// Update Main User
usersRouter.put('/', (req, res) => {

    let userID = req.headers.authorization
    let userNewInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName
    }

    UserModel.findByIdAndUpdate(userID, userNewInfo).then(result => {
        console.log(result)
        res.send(true)
    })
})

// Get User Products
usersRouter.get('/products', (req, res) => {

    let userID = req.headers.authorization

    userProductsModel.find({ user: userID })
        .populate("products")
        .lean()
        .then(userProducts => {
            res.json(userProducts)
        })
})



module.exports = usersRouter