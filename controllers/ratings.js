const Rating = require('../models/rating')
const mongoose = require('mongoose')


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


        
    
    }
}

module.exports = RatingsController