const app = require("../../app");
const mongoose = require("mongoose");
const request = require("supertest");
require("../mongodb_helper");
// const {
//     seedDatabase,
// } = require("/Users/MakersAdmin/Documents/Projects/cheese/api/bin/seed_database.js");

describe("test the api/cheeses/type/:type endpoint", () => {
    // beforeAll(async () => {
    //     // Seed the test database before tests run
    //     await seedDatabase();
    // });

    it("should return a list of cheeses of the specified type", async () => {
        let response = await request(app).get("/api/cheeses/type/hard");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(185);
    });
    // it("should return a 404 if the type is not found", async () => {
    //     let response = await request(app).get("/api/cheeses/type/giraffe");
    //     expect(response.statusCode).toBe(404);
    // });

    // it("should return all cheeses if passed 'all' as the type", async () => {
    //     let response = await request(app).get("/api/cheeses/type/all");
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toHaveLength(811);
    // });
});
