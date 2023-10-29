const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER",
    }
},{ timestamps: true }
)

let User = mongoose.model('Users', userSchema)
module.exports = User
