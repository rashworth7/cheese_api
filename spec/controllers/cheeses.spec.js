require("../mongodb_helper");
const app = require("../../app");
const mongoose = require("mongoose");
const request = require("supertest");
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

describe("/cheeses/:id", () => {
    describe("GET, id is present and in the database", () => {
        test("returns the correct cheese", async () => {
            let cheeses = await Cheese.find()
            let response = await request(app)
              .get(`/api/cheeses/${cheeses[0]._id}`)
            expect(response.statusCode).toBe(200);
            expect(response.body.name).toEqual("Zamorano")
            expect(response.body.type).toEqual(["hard"])
            expect(response.body.countries).toEqual(["Spain"])
            expect(response.body.image).toEqual("https://cheese.com/media/img/cheese/Zamorano-cheese.jpg")
        });

        test("returns the correct cheese for second cheese", async () => {
          let cheeses = await Cheese.find()
          let response = await request(app)
            .get(`/api/cheeses/${cheeses[1]._id}`)
          expect(response.statusCode).toBe(200);
          expect(response.body.name).toEqual("Ubriaco al Prosecco");
          expect(response.body.type).toEqual(["semi-hard","artisan"]);
          expect(response.body.aromas).toEqual(["fresh","fruity"])
          expect(response.body.image).toEqual("https://cheese.com/media/img/cheese/Ubriaco-Prosecco.jpg");
      });

        test("throws error if incorrect id ", async () => {
          let response = await request(app)
            .get(`/api/cheeses/${mongoose.Types.ObjectId()}`)
          expect(response.statusCode).toEqual(404);
          expect(response.body.message).toEqual("Cheese not found")
        })
    })
})
