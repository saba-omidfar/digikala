const express = require('express')
const sellerRouter = express.Router()
const sellerModel = require('../models/seller')

// Get All sellers API
sellerRouter.get('/', (req, res) => {
    sellerModel.find({}).then(allSellers => {
        res.send(allSellers)
    })
})

// Find One By ID
sellerRouter.get('/:id', (req, res) => {
    sellerModel.findOne({ _id: req.params.id })
    .then(seller => res.send(seller))
    .catch(error => {
            res.status(400).send({ error: 'Error finding seller', message: error.message })
        })
        // .populate("categoryID")
        // .populate("creator")
        // .lean()
        // .then(product => {
        //     if (!product) {
        //         return res.status(404).json({ message: "no product found!" })
        //     }

        //     commentModel
        //         .find({ product: product._id })
        //         .populate("creator")
        //         .lean()
        //         .then(allComments => {
        //             let comments = []

        //             if (allComments.length !== 0) {
        //                 allComments.forEach(comment => {
        //                     let mainCommentAnswerInfo = null
        //                     allComments.forEach((answerComment) => {
        //                         if (String(comment._id) == String(answerComment.mainCommentID)) {
        //                             mainCommentAnswerInfo = { ...answerComment }
        //                         }
        //                     })

        //                     if (!comment.mainCommentID) {
        //                         comments.push({
        //                             ...comment,
        //                             product: comment.product._id,
        //                             answerContent: mainCommentAnswerInfo,
        //                         })
        //                     }
        //                 })
        //             }

        //             res.send({
        //                 ...product,
        //                 comments: comments,
        //             })
        //         })
        // }).catch(error => {
        //     res.status(400).send({ error: 'Error finding seller', message: error.message })
        // })
})

module.exports = sellerRouter