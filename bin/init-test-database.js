const mongoose = require("mongoose");
const fs = require("fs");
const cheeseModel = require("../models/cheese");
const { ObjectId } = require("mongoose").Types; // Import ObjectId

// Connect to the local MongoDB database
mongoose.connect("mongodb://localhost:27017/cheese_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Read data from the JSON file
const data = JSON.parse(fs.readFileSync("bin/cheeses.json", "utf8"));

data.forEach((entry) => {
    if (entry._id && entry._id["$oid"]) {
        entry._id = new ObjectId(entry._id["$oid"]);
    }
});

// Populate the database with data from the JSON file
cheeseModel.insertMany(data, (err, result) => {
    if (err) {
        console.error("Error populating database:", err);
    } else {
        console.log("Database populated successfully!");
    }

    // Close the database connection
    mongoose.connection.close();
});
