const mongoose = require('mongoose')

let productSchema = mongoose.Schema(
    {
        categoryID: {
            type: mongoose.Types.ObjectId,
            ref: "Categories",
            require: true,
        },
        submenuID: {
            type: mongoose.Types.ObjectId,
            ref: "MegaMenus",
            require: true,
        },
        subSubmenu: {
            type: mongoose.Types.ObjectId,
            ref: "MegaMenus",
            require: true,
        },
        name: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        engTitle: {
            type: String,
            required: false,
        },
        clientSatisfaction: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        images: [{
            url: {
                type: String,
                required: true,
            },
            isMain: {
                type: Boolean,
                default: false
            }
        }],
        stock: {
            type: Number,
            required: false,
        },
        selectedColors: [{
            type: Object,
            required: false,
        }],
        brand: {
            type: String,
            required: true,
        },
        availibility: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        shortName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        colors: [{
            type: String,
            required: true
        }],
        seller: {
            type: mongoose.Types.ObjectId,
            ref: "seller"
        },
        creator: {
            type: mongoose.Types.ObjectId,
            ref: "Users",
        },
        productIntroduction: {
            type: String,
            required: true,
        },
        attributes: {
            key: {
                type: String,
                required: true
            }
        },
        specificAttribute: {
            key: {
                type: String,
                required: true
            }
        }
    }, { timestamps: true }
)

productSchema.virtual("comments", {
    ref: "Comments",
    localField: "_id",
    foreignField: "product",
})


let products = mongoose.model('Products', productSchema)
module.exports = products

