const Rating = require("../models/rating");
const mongoose = require("mongoose");
const TokenGenerator = require("../lib/token_generator");
const tokenChecker = require("../middleware/tokenChecker");
const CheeseCleaner = require("../middleware/CheeseCleaner");
const cheese = require("../models/cheese_display");

const RatingsController = {
    GetByCheeseId: async (req, res) => {
        try {
            const ratings = await Rating.find({ cheeseId: req.params.id });
            if (ratings.length === 0) {
                res.status(404).json({
                    message: "This cheese is currently not rated!",
                });
            } else {
                let totalRating = 0;
                for (const rating of ratings) {
                    totalRating += rating.cheeseRating;
                }
                const meanRating = parseFloat(
                    (totalRating / ratings.length).toFixed(1)
                );
                res.status(200).json({ meanRating });
            }
        } catch (error) {
            console.error("Error fetching rating", error);
            res.status(500).json({ error: "server error" });
        }
    },

    AddRating: async (req, res) => {
        const token = req.headers.authorization.replace("Bearer ", "");
        const { user_id: userId } = TokenGenerator.verify(token);
        try {
            const ratingData = {
                cheeseRating: req.body.cheeseRating,
                userId: userId,
                cheeseId: req.params.id,
            };
            const existingRating = await Rating.find({
                userId: userId,
                cheeseId: req.params.id,
            }).lean();
            if (existingRating.length !== 0) {
                res.status(409).json({
                    message: "You've already rated this mate!",
                });
            } else {
                const rating = new Rating(ratingData);
                await rating.save();
                res.status(201).json({
                    message: "New rating added",
                    token: token,
                });
            }
        } catch (error) {
            res.status(500).json({ error: "server error" });
        }
    },

    GetRecommendation: async (req, res) => {
        const token = req.headers.authorization.replace("Bearer ", "");
        const { user_id: userId } = TokenGenerator.verify(token);
        try {
            // Find all ratings for the given user, populate the cheese data, and convert to plain objects
            const ratings = await Rating.find({ userId: userId })
                .populate("cheeseId")
                .lean();
            if (ratings.length === 0) {
                res.status(404).json({
                    message: "You have not rated any cheeses yet!",
                });
                return;
            }
            // for each cheese type, get the average rating and store it in an object with the key being the cheese type
            const cheeseRatings = {}; // soft: [1,4,5]
            for (const rating of ratings) {
                for (const cheeseType of rating.cheeseId.attributes.types) {
                    if (cheeseRatings[cheeseType] === undefined) {
                        cheeseRatings[cheeseType] = [];
                    }
                    cheeseRatings[cheeseType].push(rating.cheeseRating);
                }
            }
            // for each cheese type, get the average rating and store it in an object with the key being the cheese type
            const averageCheeseRatings = {}; //soft : 3.3
            for (const cheeseType in cheeseRatings) {
                const ratings = cheeseRatings[cheeseType];
                let totalRating = 0;
                for (const rating of ratings) {
                    totalRating += rating;
                }
                const meanRating = parseFloat(
                    (totalRating / ratings.length).toFixed(1)
                );
                averageCheeseRatings[cheeseType] = meanRating;
            }
            // // find all the cheeses that the user has not rated
            const cheeses = await cheese.find({}).lean().exec();
            const cheesesNotRated = [];
            for (const cheese of cheeses) {
                let cheeseIsRated = false;
                for (const rating of ratings) {
                    if (rating.cheeseId.toString() === cheese._id.toString()) {
                        cheeseIsRated = true;
                    }
                }
                if (!cheeseIsRated) {
                    cheesesNotRated.push(cheese);
                }
            }
            // // return a random cheese with the highest rated cheese type
            const highestRatedCheeseType = Object.keys(
                averageCheeseRatings
            ).reduce((a, b) =>
                averageCheeseRatings[a] > averageCheeseRatings[b] ? a : b
            );
            // // return a random cheese with the highest rated cheese type
            const cheesesWithHighestRatedType = cheesesNotRated.filter(
                (cheese) =>
                    cheese.attributes.types.includes(highestRatedCheeseType)
            );
            const randomCheese =
                cheesesWithHighestRatedType[
                    Math.floor(
                        Math.random() * cheesesWithHighestRatedType.length
                    )
                ];
            // clean the cheese with the CheeseCleaner middleware
            const cleanRandomCheese = new CheeseCleaner(randomCheese);

            res.status(200).json({
                message: "Recommendation found",
                cleanRandomCheese,
            });
        } catch (error) {
            console.error("Error fetching rating", error);
            res.status(500).json({ error: "server error" });
        }
    },
};

module.exports = RatingsController;
