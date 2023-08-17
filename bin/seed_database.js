const Cheese = require("../models/cheese"); // Import your Cheese model

// open the cheeses.json file and parse the contents into a cheeses variable
const cheeses = require("./cheeses.json");
console.log(cheeses[0]);

// create a function that will seed the database with the first 100 cheeses
const seedDatabase = () => {
    // delete the cheeses from the database
    // Cheese.deleteMany({});
    // use the Cheese model to insert the cheeses into the database
    Cheese.insertMany(cheeses)
        .then(() => {
            console.log("cheeses seeded");
        })
        .catch((err) => {
            console.log(err);
        });
};

// export the seedDatabase function
module.exports = { seedDatabase };
