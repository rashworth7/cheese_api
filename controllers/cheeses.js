const Cheese = require("../models/cheese");
const mongoose = require("mongoose");

const CheesesController = {

    Random: async (req,res) => {        
        try {
            // const randomCheese = await Cheese.findRandom().limit(1).exec();
            const randomCheese = await Cheese.aggregate([{ $sample: { size: 1 } }]);
            //Randomly selects the specified number of documents from the input documents.
            if (!randomCheese) {
                res.status(404).json({ message: "The Cheese monger is empty!" });
            } else {
                res.status(200).json(randomCheese[0]);
                console.log (randomCheese[0]);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
        // // get 1 random cheese
        // await Cheese.findRandom().limit(1).exec(function (err, cheese) {
        //     if (err){
        //         res.status(500).json({ message: "The Cheese monger is empty!"})
        //     }
        //     else {
        //         console.log(cheese)
        //         res.status(200).json({message: "OK"})
        //     }
        //     });

    CheeseById: () => {
        pass
    },
};


module.exports = CheesesController;