const mongoose = require('mongoose')

let sellerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        efficiency: {
            type: String,
            enum: ["عالی", "متوسط", "ضعیف"]
        },
        orders: [{
            type: mongoose.Types.ObjectId,
            ref: "Products",
        }],
        clientSatisfaction: {
            type: Number,
            required: true,
        },
        post: [{
            type: String,
            required: true,
            default: 'موجود در انبار دیجیکالا'
        }],
        supplyProduct: {
            type: Number,
            required: true,
        },
        postCommitment: {
            type: Number,
            required: true,
        },
        productWithoutReturns: {
            type: Number,
            required: true,
        },
        digikalaAvailibility: {
            type: Boolean,
            default: true
        },
        sellerAvailibility: {
            type: Boolean,
            default: true
        },
        bothAvailibility: {
            type: Boolean,
            default: true
        },
        usersScore: [{
            type: mongoose.Types.ObjectId,
            ref: "Users",
        }],
        digiclubScore: {
            type: Number,
            required: true
        }
    }, { timestamps: true }
)


let seller = mongoose.model('Sellers', sellerSchema)
module.exports = seller