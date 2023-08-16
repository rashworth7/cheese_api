const express = require("express");
const router = express.Router();

const CheeseController = require("../controllers/cheeses");

router.get("/type/:type", CheeseController.GetByType);

module.exports = router;
