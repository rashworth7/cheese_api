const app = require("../../app");
const mongoose = require("mongoose");
const request = require("supertest");
require("../mongodb_helper");
const CheeseDisplay = require("../../models/cheese_display");


describe("/cheeses/:id", () => {
    beforeEach(async () => {
        await CheeseDisplay.deleteMany({})
        await CheeseDisplay.insertMany(
            [{
              name: "Zamorano",
              type: ["hard"],
              description: "Tasty",
              flavour: "very delicious",
              aromas: ["cheesey", "feet"],
              region: "a very nice region",
              countries: ["England"],
              milks: ["cow"],
              image: "www.test.com",
              vegetarian: true,
            },
          {
            name: "rocopocolo",
            type: ["soft", "gooey"],
            description: "mmmm very nice cheese",
            flavour: "cheesey very cheesey",
            aromas: ["sweet"],
            region: "some region",
            countries: ["Spain"],
            milks: ["cow"],
            image: "www.test22222.com",
            vegetarian: false,
          }
        ])
    });

    describe("GET, id is present and in the database", () => {
        test("returns the correct cheese", async () => {
            let cheeses = await CheeseDisplay.find()
            let response = await request(app)
              .get(`/api/cheeses/${cheeses[0].id}`)
        
            expect(response.statusCode).toBe(200);
            expect(response.body.name).toEqual("Zamorano")
            expect(response.body.type).toEqual(["hard"])
            expect(response.body.image).toEqual("www.test.com")
        });

        test("returns the correct cheese for second cheese", async () => {
          let cheeses = await CheeseDisplay.find()
          let response = await request(app)
            .get(`/api/cheeses/${cheeses[1].id}`)
      
          expect(response.statusCode).toBe(200);
          expect(response.body.name).toEqual("rocopocolo");
          expect(response.body.type).toEqual(["soft", "gooey"]);
          expect(response.body.image).toEqual("www.test22222.com");
      });

        test("throws error if incorrect id ", async () => {
          let response = await request(app)
            .get(`/api/cheeses/${mongoose.Types.ObjectId()}`)

          expect(response.statusCode).toEqual(404);
          expect(response.body.message).toEqual("Cheese not found")

        })
    })
})
