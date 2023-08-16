const CheeseDisplay = require("../models/cheese_display");

const CheesesController = {

    Random: () => {
        pass
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
};

module.exports = CheesesController;