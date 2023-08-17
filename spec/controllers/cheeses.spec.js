const app = require("../../app");
const mongoose = require("mongoose");
const request = require("supertest");
require("../mongodb_helper");
const Cheese = require("../../models/cheese");


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
