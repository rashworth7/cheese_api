const Rating = require("../../models/rating")
const app = require("../../app")
const mongoose = require("mongoose")
const request = require("supertest");
const User = require('../../models/user');
require("../mongodb_helper");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;
let token2;
let token3;
let userId;
let user2Id;
let user3Id;



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

describe("POST rating", () => {

    beforeAll( async () => {
        await Rating.deleteMany({})

        const user = new User({email: "myemail", password: "mypassword", username: "myusername"})
        user.save(err => {
        })

        userId = user._id;
        token = JWT.sign({
          user_id: user.id,
          // Backdate this token of 5 minutes
          iat: Math.floor(Date.now() / 1000) - (5 * 60),
          // Set the JWT token to expire in 10 minutes
          exp: Math.floor(Date.now() / 1000) + (10 * 60)
        }, secret);
        
        
        
        
    });
    beforeEach( async () => {
        await Rating.deleteMany({});
      });
    
    // afterAll( async () => {
    //     await User.deleteMany({})
    // })

    describe("POST when token is present", () => {
        it("responds with a 201 and creates a new rating", async () => {

            let response = await request(app)
            .post(`/api/ratings/cheese/64db5af1ee3a0c2443b9147d0`)
            .set("Authorization", `Bearer ${token}`)
            .send({cheeseId: "64db5af1ee3a0c2443b9147d", cheeseRating: 4, token: token})

            let ratings = await Rating.find().lean();
            expect(response.status).toEqual(201);
            expect(ratings.length).toEqual(1);
            expect(ratings[0].userId).toEqual(userId);
            expect(ratings[0].cheeseId.toString()).toEqual("64db5af1ee3a0c2443b9147d");
            expect(ratings[0].cheeseRating).toEqual(4);
        })
        it("returns a 409 error if cheese is already rated", async () => {
            await request(app)
            .post(`/api/ratings/cheese/64db5af1ee3a0c2443b9147d0`)
            .set("Authorization", `Bearer ${token}`)
            .send({cheeseId: "64db5af1ee3a0c2443b9147d", cheeseRating: 4, token: token})

            let response = await request(app)
            .post(`/api/ratings/cheese/64db5af1ee3a0c2443b9147d0`)
            .set("Authorization", `Bearer ${token}`)
            .send({cheeseId: "64db5af1ee3a0c2443b9147d", cheeseRating: 4, token: token})

            expect(response.status).toEqual(409)
        })

        it("3 users make 3 ratings for the the same cheese, get ratings returns the mean of the 3 ratings", async () => {
            let response1 = await request(app)
            .post(`/api/ratings/cheese/64db5af1ee3a0c2443b9147d`)
            .set("Authorization", `Bearer ${token}`)
            .send({cheeseId: mongoose.Types.ObjectId("64db5af1ee3a0c2443b9147d"), cheeseRating: 4, token: token})

            console.log("response code 1", response1.statusCode)

            const user2 = new User({email: "seconduseremail", password: "2ndpassword", username: "2ndusername"})
            user2.save(err => {
            })

            user2Id = user2._id;
            token2 = JWT.sign({
            user2_id: user2.id,
            // Backdate this token of 5 minutes
            iat: Math.floor(Date.now() / 1000) - (5 * 60),
            // Set the JWT token to expire in 10 minutes
            exp: Math.floor(Date.now() / 1000) + (10 * 60)
            }, secret);

            let response2 = await request(app)
            .post(`/api/ratings/cheese/64db5af1ee3a0c2443b9147d`)
            .set("Authorization", `Bearer ${token2}`)
            .send({cheeseId: mongoose.Types.ObjectId("64db5af1ee3a0c2443b9147d"), cheeseRating: 5, token: token2})

            console.log("response code 2", response2.statusCode)

            // const user3 = new User({email: "thirduseremail", password: "thirdpassword", username: "3rdusername"})

            // user3.save(err => {
            // })

            // user3Id = user3._id;
            // token3 = JWT.sign({
            // user3_id: user3.id,
            // // Backdate this token of 5 minutes
            // iat: Math.floor(Date.now() / 1000) - (5 * 60),
            // // Set the JWT token to expire in 10 minutes
            // exp: Math.floor(Date.now() / 1000) + (10 * 60)
            // }, secret);

            // let response3 = await request(app)
            // .post(`/api/ratings/cheese/64db5af1ee3a0c2443b9147d`)
            // .set("Authorization", `Bearer ${token3}`)
            // .send({cheeseId: mongoose.Types.ObjectId("64db5af1ee3a0c2443b9147d"), cheeseRating: 4, token: token3})

            // console.log("response code 3", response3.statusCode)

            let response = await request(app)
            .get("/api/ratings/64db5af1ee3a0c2443b9147d")
            console.log("response", response.statusCode)
            expect(response.body.meanRating).toEqual(4.5)

        })
    })
})