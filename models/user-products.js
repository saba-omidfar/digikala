const mongoose = require('mongoose')

let productUserSchema = mongoose.Schema(
    {
        products: [{
            type: mongoose.Types.ObjectId,
            ref: "Products"
        }],
        user: {
            type: mongoose.Types.ObjectId,
            ref: "Users"
        },
        price: {
            type: Number,
            required: true,
        }
    }, { timestamps: true }
)


let productsUser = mongoose.model('user-products', productUserSchema)
module.exports = productsUser