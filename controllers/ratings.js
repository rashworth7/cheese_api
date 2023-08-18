const Rating = require('../models/rating')
const mongoose = require('mongoose')
const TokenGenerator = require("../lib/token_generator");
const tokenChecker = require("../middleware/tokenChecker")


const RatingsController = {
    GetByCheeseId: async (req, res) => {
        try {
            const ratings = await Rating.find({cheeseId: req.params.id});
            if (ratings.length === 0) {

                res.status(404).json({ message: "This cheese is currently not rated!"})
                ;
            } else {
                let totalRating = 0
                for (const rating of ratings) {
                    totalRating += rating.cheeseRating
                }
                const meanRating = parseFloat((totalRating / ratings.length).toFixed(1))
            res.status(200).json({ meanRating })
            }
        } catch (error){
            console.error("Error fetching rating", error)
            res.status(500).json({ error: "server error"})
        }
    },

    AddRating: async (req, res) => {
        const token = req.headers.authorization.replace("Bearer ", "");
        const { user_id: userId } = TokenGenerator.verify(token);
        try {
            const ratingData = {cheeseRating: req.body.cheeseRating, userId: userId, cheeseId: req.params.id}
            console.log("RATING*DATA", ratingData);
            const existingRating = await Rating.find({userId: userId, cheeseId: req.params.id}).lean();
        if (existingRating.length !== 0) {
            res.status(409).json({message: "You've already rated this mate!"})
        } else {
            const rating = new Rating(ratingData)
            await rating.save()
            res.status(201).json({message: "New rating added", token: token})
        }
        } catch (error) {
            res.status(500).json({ error: "server error"})
        }
    }
}

module.exports = RatingsController