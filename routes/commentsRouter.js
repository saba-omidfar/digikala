const express = require('express')
const commentsModel = require('../models/Comments')
const commentsRouter = express.Router()

// Get All Comments API
commentsRouter.get('/', (req, res) => {

    commentsModel.find()
        .populate("product")
        .populate("creator")
        .lean()
        .then(allComments => {

            if (allComments.length === 0) {
                return res.status(404).json({ message: "no comments found!" });
            }

            let comments = []

            allComments.forEach(comment => {

                let mainCommentAnswerInfo = null

                allComments.forEach((answerComment) => {
                    if (String(comment._id) == String(answerComment.mainCommentID)) {
                        mainCommentAnswerInfo = { ...answerComment }
                    }
                })

                if (!comment.mainCommentID) {
                    comments.push({
                        ...comment,
                        product: comment.product.name,
                        answerContent: mainCommentAnswerInfo,
                    })
                }
            })
            res.send(comments)
        })
})

commentsRouter.put('/like/:id', async (req, res) => {
    const { userId } = req.body
    const { productId } = req.body

    try {
        const comments = await commentsModel.find({ product: `${productId}` })
        for (let i = 0; i < comments.length; i++) {
            if ((comments[i]._id).toString() === req.params.id) {

                if (comments[i].likesUser.includes(userId)) {

                    //user has already liked this comment, so remove their like
                    const updatedLikesUser = comments[i].likesUser.filter((id) => id.toString() !== userId)
                    await comments[i].updateOne({ likesUser: updatedLikesUser, $inc: { like: -1 } })

                } else if (comments[i].unlikesUser.includes(userId)) {

                    //user has already unliked this comment, so remove their unlike and add like
                    const updatedUnlikesUser = comments[i].unlikesUser.filter((id) => id.toString() !== userId)
                    const updatedLikesUser = [...comments[i].likesUser, userId]

                    await comments[i].updateOne({
                        unlikesUser: updatedUnlikesUser,
                        likesUser: updatedLikesUser,
                        $inc: { like: 1, unlike: -1 }
                    })

                } else {

                    //user has not liked or unliked this comment, so add a like
                    const updatedLikesUser = [...comments[i].likesUser, userId]
                    await comments[i].updateOne({ likesUser: updatedLikesUser, $inc: { like: 1 } })

                }
            }
        }

        res.send(true)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
})

commentsRouter.put('/unlike/:id', async (req, res) => {
    const { userId } = req.body
    const { productId } = req.body

    try {
        const comments = await commentsModel.find({ product: `${productId}` })
        for (let i = 0; i < comments.length; i++) {
            if ((comments[i]._id).toString() === req.params.id) {

                if (comments[i].unlikesUser.includes(userId)) {

                    //user has already liked this comment, so remove their like
                    const updatedUnlikesUser = comments[i].unlikesUser.filter((id) => id.toString() !== userId)
                    await comments[i].updateOne({ unlikesUser: updatedUnlikesUser, $inc: { unlike: -1 } })

                } else if (comments[i].likesUser.includes(userId)) {

                    //user has already unliked this comment, so remove their unlike and add like
                    const updatedLikesUser = comments[i].likesUser.filter((id) => id.toString() !== userId)
                    const updatedUnlikesUser = [...comments[i].unlikesUser, userId]

                    await comments[i].updateOne({
                        unlikesUser: updatedUnlikesUser,
                        likesUser: updatedLikesUser,
                        $inc: { like: -1, unlike: 1 }
                    })

                } else {

                    //user has not liked or unliked this comment, so add a like
                    const updatedUnlikesUser = [...comments[i].likesUser, userId]
                    await comments[i].updateOne({ unlikesUser: updatedUnlikesUser, $inc: { unlike: 1 } })

                }
            }
        }

        res.send(true)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
})

commentsRouter.post('/comment/add', async (req, res) => {
    const { title, body, product, seller, creator, hideName, answer, answerContent, score, likesUser, unlikesUser, like, unlike, positivePoints, negativePoints, isAnswer, isQuestion, mainCommentID } = req.body;

    try {
        const newCommentData = new commentsModel({
            title,
            body,
            product,
            seller,
            creator,
            hideName,
            answer: 0,
            score,
            isAnswer: 0,
            isQuestion: 0,
        })

        if (answerContent) newCommentData.answerContent = answerContent
        if (likesUser) newCommentData.likesUser = likesUser
        if (unlikesUser) newCommentData.unlikesUser = unlikesUser
        if (like) newCommentData.like = like
        if (unlike) newCommentData.unlike = unlike
        if (positivePoints) newCommentData.positivePoints = positivePoints
        if (negativePoints) newCommentData.negativePoints = negativePoints
        if (mainCommentID) newCommentData.mainCommentID = mainCommentID

        const savedComment = await newCommentData.save()

        res.status(200).json(savedComment)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
})

commentsRouter.post('/question/add', async (req, res) => {
    const { title, body, product, seller, creator, hideName, answer, answerContent, score, likesUser, unlikesUser, like, unlike, positivePoints, negativePoints, isAnswer, isQuestion, mainCommentID } = req.body;

    try {
        const newQuestionData = new commentsModel({
            title,
            body,
            product,
            seller,
            creator,
            hideName: false,
            answer: 0,
            score,
            isAnswer: 0,
            isQuestion: 1,
        })

        if (title) newQuestionData.answerContent = answerContent
        if (answerContent) newQuestionData.answerContent = answerContent
        if (likesUser) newQuestionData.likesUser = likesUser
        if (unlikesUser) newQuestionData.unlikesUser = unlikesUser
        if (like) newQuestionData.like = like
        if (unlike) newQuestionData.unlike = unlike
        if (positivePoints) newQuestionData.positivePoints = positivePoints
        if (negativePoints) newQuestionData.negativePoints = negativePoints
        if (mainCommentID) newQuestionData.mainCommentID = mainCommentID

        const savedQuestion = await newQuestionData.save()

        res.status(200).json(savedQuestion)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
})

commentsRouter.post('/answer/add', async (req, res) => {

    const { body, creator, mainCommentID } = req.body

    if (!mainCommentID) {
        return res.status(400).json({ message: "mainCommentID is required to post an answer." });
    }

    try {
        const newAnswerData = new commentsModel({
            body,
            creator,
            isAnswer: 1,
            mainCommentID
        })

        const savedAnswer = await newAnswerData.save()

        res.status(200).json(savedAnswer)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
})

module.exports = commentsRouter

