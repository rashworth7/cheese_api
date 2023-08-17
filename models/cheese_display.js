// This is the schema for the cheeses we are displaying on the app.

const mongoose = require("mongoose");
const CheeseSchema = new mongoose.Schema({
    name: String,
    type: [String],
    description: String,
    flavour: String,
    family: String,
    aromas: [String],
    region: String,
    countries: [String],
    milks: [String],
    image: String,
    vegetarian: Boolean,
});

module.exports = mongoose.model("cheese", CheeseSchema);