require("../mongodb_helper");
const app = require("../../app");
const mongoose = require("mongoose");
const request = require("supertest");
const Cheese = require("../../models/cheese");
const CheesesController = require("../../controllers/cheeses");

describe("GET, when rendering the landing page 1 random cheese will present", () => {
    it("should return random data and response code 200", async () => {
        const mockAggregate = jest.fn().mockResolvedValue([
            {
                _id: {
                    $oid: "64db5af1ee3a0c2443b9147d",
                },
                attributes: {
                    alternative_spellings: [],
                    synonyms: ["Zamorano DOP"],
                    producers: [],
                    aromas: ["sweet"],
                    flavors: ["nutty", "salty"],
                    textures: ["crumbly"],
                    types: ["hard"],
                    countries: ["Spain"],
                    vegetarian: "false",
                    color: "pale-yellow",
                    rind: "natural",
                    calcium: null,
                    fat: null,
                    family: null,
                    region: "Castilla-Leon, Zamora",
                    made: "Made from unpasteurized sheep's milk",
                },
                milks: ["sheep"],
                country_codes: ["ES"],
                id: 0,
                description:
                    "Zamorano DOP (PDO) is a renowned Spanish cheese made from raw sheep's milk in the picturesque region of Castile-Leon, Zamora. This hard cheese takes almost six months to reach its full potential. Its appearance boasts a pale-yellow hue and a delightful crumbly texture. Notably, Zamorano's distinctive zigzag pattern on its rind and cylindrical shape resembles other cheeses like Castellano or Manchego.It gets a characteristic flavour because of the milk of scruffy Churra and the Castilian sheep breed. This sweet, nutty and salty cheese is served as a table cheese with White, Red, and Zinfandel wine. ",
                image: "https://cheese.com/media/img/cheese/Zamorano-cheese.jpg",
                link: "https://cheese.com/zamorano/",
                name: "Zamorano",
                __v: 0,
            },
        ]);
        Cheese.aggregate = mockAggregate;
        const response = await request(app).get("/api/cheeses/random");
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toEqual("Zamorano");
        expect(response.body.type).toEqual(["hard"]);
        expect(response.body.countries).toEqual(["Spain"]);
        expect(response.body.image).toEqual(
            "https://cheese.com/media/img/cheese/Zamorano-cheese.jpg"
        );
        expect(mockAggregate).toHaveBeenCalledWith([{ $sample: { size: 1 } }]);
    });
});

describe("/cheeses/:id", () => {
    describe("GET, id is present and in the database", () => {
        test("returns the correct cheese", async () => {
            let cheeses = await Cheese.find();
            let response = await request(app).get(
                `/api/cheeses/${cheeses[0]._id}`
            );
            expect(response.statusCode).toBe(200);
            expect(response.body.name).toEqual("Zamorano");
            expect(response.body.type).toEqual(["hard"]);
            expect(response.body.countries).toEqual(["Spain"]);
            expect(response.body.image).toEqual(
                "https://cheese.com/media/img/cheese/Zamorano-cheese.jpg"
            );
        });

        test("returns the correct cheese for second cheese", async () => {
            let cheeses = await Cheese.find();
            let response = await request(app).get(
                `/api/cheeses/${cheeses[1]._id}`
            );
            expect(response.statusCode).toBe(200);
            expect(response.body.name).toEqual("Ubriaco al Prosecco");
            expect(response.body.type).toEqual(["semi-hard", "artisan"]);
            expect(response.body.aromas).toEqual(["fresh", "fruity"]);
            expect(response.body.image).toEqual(
                "https://cheese.com/media/img/cheese/Ubriaco-Prosecco.jpg"
            );
        });

        test("throws error if incorrect id ", async () => {
            let response = await request(app).get(
                `/api/cheeses/${mongoose.Types.ObjectId()}`
            );
            expect(response.statusCode).toEqual(404);
            expect(response.body.message).toEqual("Cheese not found");
        });
    });
});
