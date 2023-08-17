const CheeseSchema = require("../models/cheese_display");
const CheeseCleaner = require("../middleware/CheeseCleaner");

const CheesesController = {
    GetByType: async (req, res) => {
        const { type } = req.params;
        try {
            if (type === "all") {
                const all_cheese_results = await CheeseSchema.find({}).lean();
                const CheeseCleaners = all_cheese_results.map((cheese) => {
                    return new CheeseCleaner(cheese);
                });
                return res.status(200).json(CheeseCleaners);
            } else {
                const cheese_results = await CheeseSchema.find({
                    "attributes.types": type,
                }).lean();
                if (cheese_results.length === 0) {
                    return res.status(404).json("Cheese type not found");
                }
                const CheeseCleaners = cheese_results.map((cheese) => {
                    return new CheeseCleaner(cheese);
                });
                res.status(200).json(CheeseCleaners);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
  
  CheeseById: async (req, res) => {
        const cheeseId = req.params.id;
        console.log(cheeseId)
        try {
            const cheese = await CheeseDisplay.findById(cheeseId)
            if (!cheese) {
                res.status(404).json({ message: "Cheese not found" })  
                } else {
                    res.status(200).json(cheese)
                }
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: "server error" });
        }
    },  

    Random: () => {
        pass
    },
  
};

module.exports = CheesesController;
