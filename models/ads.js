const mongoose = require('mongoose')

let adsSchema = mongoose.Schema(
    {
        banner: {
            type: String,
            required: true,
        },
        href: {
            type: String,
            required: true,
        },
        categoryID: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
            require: true,
        }
    }, { timestamps: true }
)


let ads = mongoose.model('Ads', adsSchema)
module.exports = ads