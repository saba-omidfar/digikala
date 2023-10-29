const mongoose = require('mongoose')

let categorySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
            required: true,
        },
        parent: {
            type: mongoose.Types.ObjectId,
            ref: "MegaMenus",
            required: false,
        }
    }, { timestamps: true }
)


let categories = mongoose.model('Categories', categorySchema)
module.exports = categories