const express = require("express");
const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker");

const RatingsController = require("../controllers/ratings");

router.get("/:id", RatingsController.GetByCheeseId);
router.get(
    "/get/recommendation",
    tokenChecker,
    RatingsController.GetRecommendation
);
router.post("/cheese/:id", tokenChecker, RatingsController.AddRating);

module.exports = router;
