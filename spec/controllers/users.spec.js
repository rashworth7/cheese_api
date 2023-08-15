const app = require("../../app");
const mongoose = require("mongoose");
const request = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;
let user;

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });


  describe("POST, when email and password and username are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/api/users")
        .send({
          email: "poppy@email.com",
          password: "1234",
          username: "myusername",
        });
      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app)
        .post("/api/users")
        .send({
          email: "scarlett@email.com",
          password: "1234",
          username: "myusername",
        });
      let users = await User.find();
      let newUser = users[users.length - 1];
      expect(newUser.email).toEqual("scarlett@email.com");
    });

    test("when user created profile pic added ", async () => {
      await request(app)
        .post("/api/users")
        .send({
          email: "scarlett@email.com",
          password: "1234",
          username: "myusername",
          profilePic: "sample.jpg",
        });
      let users = await User.find();
      let newUser = users[users.length - 1];
      expect(newUser.email).toEqual("scarlett@email.com");
      expect(newUser.profilePic).toEqual("sample.jpg");
    });

    test("username added", async () => {
      await request(app)
        .post("/api/users")
        .send({
          email: "scarlett@email.com",
          password: "1234",
          username: "myusername",
        });
      let users = await User.find();
      let newUser = users[users.length - 1];
      expect(newUser.username).toEqual("myusername");
    });
  });

  describe("POST, when password and username is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/api/users")
        .send({ email: "skye@email.com" });
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user when password is missing", async () => {
      await request(app)
        .post("/api/users")
        .send({ email: "skye@email.com", username: "myusername" });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });

    test("does not create a user when username is missing", async () => {
      await request(app)
        .post("/api/users")
        .send({ email: "skye@email.com", password: "hello" });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("GET, /users/@me returns the correct data", () => {
    beforeAll(async () => {
      const user = new User({
        email: "testaccount@test.com",
        password: "123456789",
        username: "mysupercoolusername",
        profilePic: "mypic.jpg",
      });
      user.save((err) => {});
      userId = user._id;
      token = JWT.sign(
        {
          user_id: user.id,
          // Backdate this token of 5 minutes
          iat: Math.floor(Date.now() / 1000) - 5 * 60,
          // Set the JWT token to expire in 10 minutes
          exp: Math.floor(Date.now() / 1000) + 10 * 60,
        },
        secret
      );
    });

    test("response data is correct", async () => {
      const response = await request(app)
        .get("/api/users/@me")
        .set("Authorization", `Bearer ${token}`)
        .send({token:token});

      expect(response.statusCode).toBe(200);
      expect(response.body.username).toEqual("mysupercoolusername");
      expect(response.body.email).toEqual("testaccount@test.com");
      expect(response.body.profilePic).toEqual("mypic.jpg");
    });
  });

  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/api/users")
        .send({ password: "1234" });
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/api/users").send({ password: "1234" });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });
});

describe("GET /users/:id", () => {
  beforeAll(async () => {
    user = new User({
      email: "test@test.com",
      password: "12345678",
      username: "myusername",
    });
    await user.save();

    token = JWT.sign(
      {
        user_id: user.id,
        // Backdate this token of 5 minutes
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  test("should return user info when authenticated and id matches", async () => {
    let response = await request(app) //defining the response -> to app -> route setup /users (happens in 101)
      .get(`/api/users/${user.id}`) // get request
      .set("Authorization", `Bearer ${token}`); // sets the authorization header using the token
    expect(response.statusCode).toEqual(200);
    expect(response.body.email).toEqual("test@test.com");
    expect(response.body.username).toEqual("myusername");
  });

  test("non existant id", async () => {
    let response = await request(app)
      .get(`/api/users/${mongoose.Types.ObjectId()}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toEqual(404);
  });

  test("no token", async () => {
    let response = await request(app).get(`/api/users/${user.id}`);
    expect(response.statusCode).toEqual(401);
  });

  test("no token and unauthorised user", async () => {
    let response = await request(app).get(
      `/api/users/${mongoose.Types.ObjectId()}`
    );
    expect(response.statusCode).toEqual(401);
  });

  // optional extra test. Create two users.
  // Attempt to access data from different user
});
