const Rating = require('../models/rating')
const mongoose = require('mongoose')
const TokenGenerator = require("../lib/token_generator");


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
        const ratingData = {...req.body, userId: userId}
        const existingRating = await Rating.find({userId: userId, cheeseId: req.body.cheeseId}).lean();
        if (existingRating) {
            res.status(409).json({message: "You've already rated this mate!"})
        } else {
            const rating = new Rating(ratingData)
        rating.save()
        res.status(201).json({message: "New rating added", token: token})
        }
    }
}

module.exports = RatingsController