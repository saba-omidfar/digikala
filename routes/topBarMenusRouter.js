const express = require('express')
const topBarMenus = express.Router()
const menusModel = require('../models/topBarMenus')

// Get All Menus API
topBarMenus.get('/', (req, res) => {
    menusModel.find({}).then(allMenus => {
        res.send(allMenus)
    })
})


module.exports = topBarMenus