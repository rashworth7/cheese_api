// This is the schema for the cheeses we are displaying on the app.

const mongoose = require("mongoose");
// define the schema for our cheese model

const CheeseDisplaySchema = new mongoose.Schema({
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

// create the model for cheeses and expose it to our app
const CheeseDisplayModel = mongoose.model("Cheese", CheeseDisplaySchema);

module.exports = CheeseDisplayModel;