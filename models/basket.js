const mongoose = require('mongoose')

const basketSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    Products: [
        {
            _id: false,
            product: {
                type: mongoose.Types.ObjectId,
                ref: 'Products', // assuming you have a Product model
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity can not be less then 1.']
            },
            isUserBuyThisProduct: {
                type: Boolean,
                default: true
            }
        }
    ]
})


let basket = mongoose.model('Basket', basketSchema)
module.exports = basket