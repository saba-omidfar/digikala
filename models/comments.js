const mongoose = require('mongoose')

let commentsSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: false,
        },
        body: {
            type: String,
            required: true,
        },
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Products",
            required: false,
        },
        seller: {
            type: mongoose.Types.ObjectId,
            ref: "Sellers",
            required: false,
        },
        creator: {
            type: mongoose.Types.ObjectId,
            ref: "Users",
            required: false,
        },
        hideName: {
            type: Boolean,
            required: true,
            default: false
        },
        answer: {
            type: Number,
            required: false,
        },
        answerContent: {
            type: mongoose.Types.ObjectId,
            ref: "Comments",
            required: false
        },
        score: {
            type: Number,
            required: false,
        },
        likesUser: [{
            type: mongoose.Types.ObjectId,
            ref: "Users",
            default: [],
            required: false,
            
        }],
        unlikesUser: [{
            type: mongoose.Types.ObjectId,
            ref: "Users",
            default: [],
            required: false,
        }],
        like: {
            type: Number,
            required: true,
            default: 0,
            required: false,
        },
        unlike: {
            type: Number,
            required: false,
            default: 0,
            required: false,
        },
        positivePoints: [{
            type: String,
            required: false
        }],
        negativePoints: [{
            type: String,
            required: false
        }],
        isAnswer: {
            type: Number,
            required: false,
        },
        isQuestion: {
            type: Number,
            required: false,
        },
        mainCommentID: {
            type: mongoose.Types.ObjectId,
            ref: "Comments",
            required: false
        }
    }, { timestamps: true }
)

let Comments = mongoose.model('Comments', commentsSchema)
module.exports = Comments
