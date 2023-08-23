const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    cheeseId: { type: mongoose.Schema.Types.ObjectId, ref: "Cheese" },
    cheeseRating: { type: Number, required: true },
});

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;
