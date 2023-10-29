const mongoose = require('mongoose')

let topBarMenusSchema = mongoose.Schema({
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
        required: true
    }
}, { timestamps: true }
)


let topBarMenus = mongoose.model('TopBarMenus', topBarMenusSchema)
module.exports = topBarMenus