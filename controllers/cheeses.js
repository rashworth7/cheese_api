const CheeseSchema = require("../models/cheese_display");
const CheeseDTO = require("../middleware/cheeseDTO");

const CheeseController = {
    GetByType: async (req, res) => {
        const { type } = req.params;
        try {
            const cheese_results = await CheeseSchema.find({
                "attributes.types": type,
            }).lean();
            const cheeseDTOs = cheese_results.map((cheese) => {
                return new CheeseDTO(cheese);
            });
            res.status(200).json(cheeseDTOs);
            console.log(cheeseDTOs);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = CheeseController;
