const express = require("express");
const router = express.Router();

const RatingsController = require("../controllers/ratings");

router.get("/:id", RatingsController.GetByCheeseId);

module.exports = router;