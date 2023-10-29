const express = require('express')
const UserModel = require('./../models/Users')
const authRouter = express.Router()

// Register New User
authRouter.post('/register', (req, res) => {

    let newUserInfo = {
        username : req.body.username,
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        phone : req.body.phone,
    }

    let newUser = new UserModel(newUserInfo)
    newUser.save().then(result => {
        res.send(true)
    })
})

// Get Main UserInfos
authRouter.get('/me', (req,res) => {

    let userID = req.headers.authorization

    UserModel.findById(`${userID}`).then(mainUserInfo => {
        res.send(mainUserInfo)
    })
})


module.exports = authRouter