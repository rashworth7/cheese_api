// const app = require("../../app");
// const mongoose = require("mongoose");
// const request = require("supertest");
// require("../mongodb_helper");
const CheeseDisplay = require("../../models/cheese_display");
// const JWT = require("jsonwebtoken");
// const secret = process.env.JWT_SECRET;

describe("Cheese model", () => {
    it("should have a name, type, description, flavour, family, animal, funkiness, vegetarian, image, and ratings", () => {
        const cheese = new CheeseDisplay({
            name: "Test Cheese",
            type: ["Test Type"],
            description: "Test Description",
            flavour: "Test Flavour",
            family: "Test Family",
            animal: ["Test Animal"],
            aromas: ["Test Aroma"],
            region: "Test Region",
            countries: ["Test Country"],
            milks: ["Test Milk"],
            image: "Test Image",
            vegetarian: true,
        });
        expect(cheese.name).toEqual("Test Cheese");
        expect(cheese.type).toContain("Test Type");
        expect(cheese.type).toHaveLength(1);
        expect(cheese.description).toEqual("Test Description");
        expect(cheese.flavour).toEqual("Test Flavour");
        expect(cheese.family).toEqual("Test Family");
        expect(cheese.region).toEqual("Test Region");
        expect(cheese.countries).toContain("Test Country");
        expect(cheese.countries).toHaveLength(1);
        expect(cheese.milks).toContain("Test Milk");
        expect(cheese.milks).toHaveLength(1);
        expect(cheese.aromas).toContain("Test Aroma");
        expect(cheese.aromas).toHaveLength(1);
        expect(cheese.vegetarian).toEqual(true);
        expect(cheese.image).toEqual("Test Image");
    });
});
