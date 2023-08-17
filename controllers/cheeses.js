const CheeseSchema = require("../models/cheese_display");
const CheeseCleaner = require("../middleware/CheeseCleaner");

const CheeseController = {
    GetByType: async (req, res) => {
        const { type } = req.params;
        try {
            const cheese_results = await CheeseSchema.find({
                "attributes.types": type,
            }).lean();
            const CheeseCleaners = cheese_results.map((cheese) => {
                return new CheeseCleaner(cheese);
            });
            res.status(200).json(CheeseCleaners);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = CheeseController;
