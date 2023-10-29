const mongoose = require('mongoose')

let popularBrandssSchema = mongoose.Schema(
    {
        name: {
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
        }
    }, { timestamps: true }
)


let popularBrands = mongoose.model('Popular-brands', popularBrandssSchema)
module.exports = popularBrands