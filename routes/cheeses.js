const express = require("express");
const router = express.Router();

const CheesesController = require("../controllers/cheeses");

router.get("/random", CheesesController.Random);//index cheese random pic
router.get("/:id", CheesesController.CheeseById);

module.exports = router;