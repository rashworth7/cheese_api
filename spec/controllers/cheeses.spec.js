const app = require("../../app");
const mongoose = require("mongoose");
const request = require("supertest");
require("../mongodb_helper");
const Cheese = require("../../models/cheese");


describe("/cheeses/:id", () => {
    beforeEach(async () => {
        await Cheese.deleteMany({})
        await Cheese.insertMany(
            [{
                "_id": "64db5af1ee3a0c2443b9147d",
                "attributes": {
                  "alternative_spellings": [],
                  "synonyms": [
                    "Zamorano DOP"
                  ],
                  "producers": [],
                  "aromas": [
                    "sweet"
                  ],
                  "flavors": [
                    "nutty",
                    "salty"
                  ],
                  "textures": [
                    "crumbly"
                  ],
                  "types": [
                    "hard"
                  ],
                  "countries": [
                    "Spain"
                  ],
                  "color": "pale-yellow",
                  "rind": "natural",
                  "calcium": null,
                  "fat": null,
                  "family": null,
                  "region": "Castilla-Leon, Zamora",
                  "made": "Made from unpasteurized sheep's milk"
                },
                "milks": [
                  "sheep"
                ],
                "country_codes": [
                  "ES"
                ],
                "id": 0,
                "description": "Zamorano DOP (PDO) is a renowned Spanish cheese made from raw sheep's milk in the picturesque region of Castile-Leon, Zamora. This hard cheese takes almost six months to reach its full potential. Its appearance boasts a pale-yellow hue and a delightful crumbly texture. Notably, Zamorano's distinctive zigzag pattern on its rind and cylindrical shape resembles other cheeses like Castellano or Manchego.It gets a characteristic flavour because of the milk of scruffy Churra and the Castilian sheep breed. This sweet, nutty and salty cheese is served as a table cheese with White, Red, and Zinfandel wine. ",
                "image": "https://cheese.com/media/img/cheese/Zamorano-cheese.jpg",
                "link": "https://cheese.com/zamorano/",
                "name": "Zamorano",
                "__v": 0
              
            },
            {
              "_id":"64db5af4ee3a0c2443b9147e",
              "attributes": {
                "alternative_spellings": [],
                "synonyms": [
                  "Ubriaco",
                  "Formaio Embriago",
                  "Drunken cheese",
                  "Drunk cheese"
                ],
                "producers": [],
                "aromas": [
                  "fresh",
                  "fruity"
                ],
                "flavors": [
                  "fruity"
                ],
                "textures": [
                  "soft"
                ],
                "types": [
                  "semi-hard",
                  "artisan"
                ],
                "countries": [
                  "Italy"
                ],
                "color": "ivory",
                "rind": "natural",
                "calcium": null,
                "fat": null,
                "family": null,
                "region": "Veneto",
                "made": "Made from cow's milk"
              },
              "milks": [
                "cow"
              ],
              "country_codes": [
                "IT"
              ],
              "id": 1,
              "description": "Ubriaco al Prosecco is made from cow's milk, made by Moro Latteria di Moro Sergio, Veneto, Italy. Affectionately called as \"drunken cheese\", the cheese is bathed in gallons of sparkling Prosecco wine along with skins, seeds, and leftovers from the winemaking process to extract the unique sweet, delicate aroma and complex flavours. The cheese is immersed for about two months and then aged for about six months. The fresh and elegantly salted cheese is best served in crumbles or thin shavings with a glass of Prosecco.",
              "image": "https://cheese.com/media/img/cheese/Ubriaco-Prosecco.jpg",
              "link": "https://cheese.com/ubriaco-al-prosecco/",
              "name": "Ubriaco al Prosecco",
              "__v": 0
          }
        ])
    });

    describe("GET, id is present and in the database", () => {
        test("returns the correct cheese", async () => {
            let cheeses = await Cheese.find()
            console
            let response = await request(app)
              .get(`/api/cheeses/${cheeses[0].id}`)
        
            expect(response.statusCode).toBe(200);
            expect(response.body.name).toEqual("Zamorano")
            expect(response.body.type).toEqual(["hard"])
            expect(response.body.countries).toEqual(["Spain"])
            expect(response.body.image).toEqual("https://cheese.com/media/img/cheese/Zamorano-cheese.jpg")
        });

        test("returns the correct cheese for second cheese", async () => {
          let cheeses = await Cheese.find()
          let response = await request(app)
            .get(`/api/cheeses/${cheeses[1].id}`)
      
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
