const express = require("express");
const router = express.Router();


const CheesesController = require("../controllers/cheeses");

router.get("/random", CheesesController.Random);//index cheese random pic
router.get("/:id", CheesesController.CheeseById);
router.get("/type/:type", CheesesController.GetByType);

module.exports = router;
