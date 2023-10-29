
const mongoose = require('mongoose')

let UserProductViewSchema = mongoose.Schema({
    userID: {
        type:  mongoose.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    product: {
        type:  mongoose.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    viewedAt: {
        type: Date,
        default: Date.now
    }
})

let UserProductView = mongoose.model('UserProductView', UserProductViewSchema)
module.exports = UserProductView
