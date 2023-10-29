const mongoose = require('mongoose')

let megaMenusSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    href: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: false,
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "MegaMenus",
        required: false,
    }
}, { timestamps: true }
)




let megaMenus = mongoose.model('MegaMenus', megaMenusSchema)
module.exports = megaMenus