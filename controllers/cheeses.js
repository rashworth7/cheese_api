const CheeseDisplay = require("../models/cheese_display");

const CheesesController = {

    Random: () => {
        pass
    },

    CheeseById: async (req, res) => {
        const cheeseId = req.params.id;
        await CheeseDisplay.findById(cheeseId, (err, cheese) => {
            if (err) {
                throw err;
              } else {
                res.status(200).json(cheese)
              }
        })
    },
};


module.exports = CheesesController;