const app = require("../../app");
const mongoose = require("mongoose");
const request = require("supertest");
const CheeseDisplay = require("../../models/cheese_display");
require("../mongodb_helper");

describe("test the api/cheeses/type/:type endpoint", () => {
    it("should return a list of cheeses of the specified type", async () => {
        let response = await request(app).get("/api/cheeses/type/hard");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(185);
    });
    it("should return a 404 if the type is not found", async () => {
        let response = await request(app).get("/api/cheeses/type/giraffe");
        expect(response.statusCode).toBe(404);
    });

    it("should return all cheeses if passed 'all' as the type", async () => {
        let response = await request(app).get("/api/cheeses/type/all");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(811);
    });
});



// describe("/cheeses/:id", () => {
//         describe("GET, id is present and in the database", () => {
//         test("returns the correct cheese", async () => {
//             let cheeses = await CheeseDisplay.find()
//             let response = await request(app)
//               .get(`/api/cheeses/${cheeses[0].id}`)
        
//             expect(response.statusCode).toBe(200);
//             expect(response.body.name).toEqual("Zamorano")
//             expect(response.body.type).toEqual(["hard"])
//             expect(response.body.image).toEqual("www.test.com")
//         });

//         test("returns the correct cheese for second cheese", async () => {
//           let cheeses = await CheeseDisplay.find()
//           let response = await request(app)
//             .get(`/api/cheeses/${cheeses[1].id}`)
      
//           expect(response.statusCode).toBe(200);
//           expect(response.body.name).toEqual("rocopocolo");
//           expect(response.body.type).toEqual(["soft", "gooey"]);
//           expect(response.body.image).toEqual("www.test22222.com");
//       });

//         test("throws error if incorrect id ", async () => {
//           let response = await request(app)
//             .get(`/api/cheeses/${mongoose.Types.ObjectId()}`)

//           expect(response.statusCode).toEqual(404);
//           expect(response.body.message).toEqual("Cheese not found")

//         })
//     })
// })
