const mongoose = require('mongoose')

let digikalaServicesSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        href: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: false,
        }
    }, { timestamps: true }
)


let DigikalaServices = mongoose.model('DigikalaServices', digikalaServicesSchema)
module.exports = DigikalaServices