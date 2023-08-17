const app = require("../../app");
const mongoose = require("mongoose");
const random = require('mongoose-random');
const request = require("supertest");
require("../mongodb_helper");

const Cheese = require("../../models/cheese");
const CheesesController = require("../../controllers/cheeses");


describe("GET, when rendering the landing page 1 random cheese will present", () => {
    it('should return random data and response code 200', async () => {  
        const mockAggregate = jest.fn().mockReturnValue([{
            name: 'Zamorano', 
            types: ['hard'], 
            countries: ['Spain'], 
            milks: ['sheep'],
            aromas: ['sweet'],
            vegetarian: false,
            image: "https://cheese.com/media/img/cheese/Zamorano-cheese.jpg"
        }]);
        // Cheese.findRandom = jest.fn(() => ({
        //         name: 'Zamorano', 
        //         types: ['hard'], 
        //         countries: ['Spain'], 
        //         milks: ['sheep'],
        //         aromas: ['sweet'],
        //         vegetarian: false,
        //         image: "https://cheese.com/media/img/cheese/Zamorano-cheese.jpg"
        //     }))
        Cheese.aggregate = mockAggregate;
        const response = await request(app).get("/api/cheeses/random");

        expect(response.statusCode).toBe(200); 
        expect(response.body).toEqual({
            name: 'Zamorano', 
            types: ['hard'], 
            countries: ['Spain'], 
            milks: ['sheep'],
            aromas: ['sweet'],
            vegetarian: false,
            image: "https://cheese.com/media/img/cheese/Zamorano-cheese.jpg"
        });
        expect(mockAggregate).toHaveBeenCalledWith([{ $sample: { size: 1 } }]);
        
    });    
});

//     test(("returns a random cheese and the response code is 200"), async () => {
//         Cheese.findRandom.mockResolvedValue([{ 
//                 name: 'Zamorano', 
//                 types: ['hard'], 
//                 countries: ['Spain'], 
//                 milks: ['sheep'],
//                 aromas: ['sweet'],
//                 vegetarian: false,
//                 image: "https://cheese.com/media/img/cheese/Zamorano-cheese.jpg"
//             }]);
//         const result = await CheesesController.Random();
//         expect(result).toEqual({                    
//             name: 'Zamorano', 
//             types: ['hard'], 
//             countries: ['Spain'], 
//             milks: ['sheep'],
//             aromas: ['sweet'],
//             vegetarian: false,
//             image: "https://cheese.com/media/img/cheese/Zamorano-cheese.jpg"
//         });
//         expect(response.statusCode).toBe(200); 
//     });
// });


//type (hard/soft etc)
// - region/country
// -family
