const CheeseSchema = require("../models/cheese_display");
const CheeseCleaner = require("../middleware/CheeseCleaner");

const CheeseController = {
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
};

module.exports = CheeseController;
