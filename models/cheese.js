const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");

// Define a schema for your data
const cheeseSchema = new mongoose.Schema({
    _id: mongoose.ObjectId, // Define _id as ObjectId
    id: Number,
    attributes: {
        alternative_spellings: [String],
        synonyms: [String],
        producers: [String],
        aromas: [String],
        flavors: [String],
        color: String,
        rind: String,
        textures: [String],
        calcium: String,
        fat: String,
        types: [String],
        family: String,
        region: String,
        countries: [String],
        made: String,
    },
    description: String,
    image: String,
    link: String,
    name: String,
    milks: [String],
    country_codes: [String],
    __v: Number,
});

// Create a model using the schema
const CheeseModel = mongoose.model("Cheese", cheeseSchema);

module.exports = CheeseModel;
