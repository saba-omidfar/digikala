const mongoose = require('mongoose')

let citiesSchema = mongoose.Schema({
    province: {
        type: String,
    },
    cities: [{
        type: String,
    }]
})

let cities = mongoose.model('Cities', citiesSchema)
module.exports = cities