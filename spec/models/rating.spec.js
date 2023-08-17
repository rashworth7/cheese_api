const Rating = require("../../models/rating")
const app = require("../../app")
const mongoose = require("mongoose")
const request = require("supertest");
require("../mongodb_helper");

beforeAll( async () => {
    await Rating.deleteMany({})
    const ratings = [
        { cheeseId: "64de265fd58b8de8758782b7", userId: "64de268efee8069ad2a4920f", cheeseRating: 1},
        { cheeseId: "64de265fd58b8de8758782b7", userId: "64de2696f0361c4027df5e86", cheeseRating: 2},
        { cheeseId: "64de265fd58b8de8758782b7", userId: "64de269ec5d76f5e98d088b5", cheeseRating: 4}
    ]
    await Rating.insertMany(ratings)
})

describe("Get rating", () => {
    it("should construct with a userId, cheeseId and rating /5", () => {
        let rating = new Rating({userId: "64db5af1ee3a0c2443b9147a", cheeseId: "64da54e8efc6473d0898e420", cheeseRating: 5});
        expect(rating.userId.toString()).toEqual("64db5af1ee3a0c2443b9147a")
        expect(rating.cheeseId.toString()).toEqual("64da54e8efc6473d0898e420")
        expect(rating.cheeseRating).toEqual(5)
    })

    it("returns the mean rating for the cheese", async () => {
        let response = await request(app).get(`/api/ratings/64de265fd58b8de8758782b7`);
        expect(response.status).toBe(200);
        expect(response.body.meanRating).toBe(2.3)
    })

    it("returns 404 and message not rated when no ratings", async () => {
        let response = await request(app).get(`/api/ratings/${mongoose.Types.ObjectId("64de27c4ae6f6f0e71ec71b8")}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("This cheese is currently not rated!")
    })
})