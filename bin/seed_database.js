const Cheese = require("../models/cheese"); // Import your Cheese model

// open the cheeses.json file and parse the contents into a cheeses variable
const cheeses = [
    {
        _id: {
            $oid: "64db5af1ee3a0c2443b9147d",
        },
        id: 0,
        attributes: {
            alternative_spellings: [],
            synonyms: ["Zamorano DOP"],
            producers: [],
            vegetarian: false,
            aromas: ["sweet"],
            flavors: ["nutty", "salty"],
            color: "pale-yellow",
            rind: "natural",
            textures: ["crumbly"],
            calcium: null,
            fat: null,
            types: ["hard"],
            family: null,
            region: "Castilla-Leon, Zamora",
            countries: ["Spain"],
            made: "Made from unpasteurized sheep's milk",
        },
        description:
            "Zamorano DOP (PDO) is a renowned Spanish cheese made from raw sheep's milk in the picturesque region of Castile-Leon, Zamora. This hard cheese takes almost six months to reach its full potential. Its appearance boasts a pale-yellow hue and a delightful crumbly texture. Notably, Zamorano's distinctive zigzag pattern on its rind and cylindrical shape resembles other cheeses like Castellano or Manchego.It gets a characteristic flavour because of the milk of scruffy Churra and the Castilian sheep breed. This sweet, nutty and salty cheese is served as a table cheese with White, Red, and Zinfandel wine. ",
        image: "https://cheese.com/media/img/cheese/Zamorano-cheese.jpg",
        link: "https://cheese.com/zamorano/",
        name: "Zamorano",
        milks: ["sheep"],
        country_codes: ["ES"],
        __v: 0,
    },
    {
        _id: {
            $oid: "64db5af4ee3a0c2443b9147e",
        },
        id: 1,
        attributes: {
            alternative_spellings: [],
            synonyms: [
                "Ubriaco",
                "Formaio Embriago",
                "Drunken cheese",
                "Drunk cheese",
            ],
            producers: [],
            vegetarian: null,
            aromas: ["fresh", "fruity"],
            flavors: ["fruity"],
            color: "ivory",
            rind: "natural",
            textures: ["soft"],
            calcium: null,
            fat: null,
            types: ["semi-hard", "artisan"],
            family: null,
            region: "Veneto",
            countries: ["Italy"],
            made: "Made from cow's milk",
        },
        description:
            'Ubriaco al Prosecco is made from cow\'s milk, made by Moro Latteria di Moro Sergio, Veneto, Italy. Affectionately called as "drunken cheese", the cheese is bathed in gallons of sparkling Prosecco wine along with skins, seeds, and leftovers from the winemaking process to extract the unique sweet, delicate aroma and complex flavours. The cheese is immersed for about two months and then aged for about six months. The fresh and elegantly salted cheese is best served in crumbles or thin shavings with a glass of Prosecco.',
        image: "https://cheese.com/media/img/cheese/Ubriaco-Prosecco.jpg",
        link: "https://cheese.com/ubriaco-al-prosecco/",
        name: "Ubriaco al Prosecco",
        milks: ["cow"],
        country_codes: ["IT"],
        __v: 0,
    },
    {
        _id: {
            $oid: "64db5af4ee3a0c2443b9147f",
        },
        id: 2,
        attributes: {
            alternative_spellings: [],
            synonyms: [],
            producers: ["Quattro Portoni"],
            vegetarian: false,
            aromas: ["earthy", "sweet"],
            flavors: ["grassy", "salty"],
            color: "ivory",
            rind: "washed",
            textures: ["creamy", "open"],
            calcium: null,
            fat: null,
            types: ["semi-soft", "artisan"],
            family: null,
            region: "Lombardy",
            countries: ["Italy"],
            made: "Made from pasteurized water buffalo's milk",
        },
        description:
            "Quadrello® di Bufala is a water buffalo milk cheese produced by Quattro Portoni in the Lombardy region of Italy. Made from pasteurised milk, this washed-rind cheese is aged for about 40 days. It shares several attributes with Taleggio, except it is made from water buffalo milk.The texture of Quadrello® di Bufala is deliciously creamy, with small holes and softness near the crust. Its semi-soft paste is straw-yellow, while the rind ranges from pale pinkish red to oatmeal colour. The flavours are sweet and grassy with a tangy and salty taste. Quadrello® di Bufala pairs well with Riesling, Cider, Farmhouse Ales and Malbec.",
        image: "https://cheese.com/media/img/cheese/Quadrello-di-Bufala.jpg",
        link: "https://cheese.com/quadrello-di-bufala/",
        name: "Quadrello® di Bufala",
        milks: ["water-buffalo"],
        country_codes: ["IT"],
        __v: 0,
    },
    {
        _id: {
            $oid: "64db5af4ee3a0c2443b91480",
        },
        id: 3,
        attributes: {
            alternative_spellings: [],
            synonyms: [],
            producers: ["Caseificio Pinzani Srl"],
            vegetarian: null,
            aromas: ["aromatic", "strong"],
            flavors: ["creamy", "full-flavored", "nutty", "sharp"],
            color: null,
            rind: "mold ripened",
            textures: ["creamy"],
            calcium: null,
            fat: null,
            types: ["semi-hard", "artisan", "blue-veined"],
            family: "Blue",
            region: "Tuscany",
            countries: ["Italy"],
            made: "Made from unpasteurized sheep's milk",
        },
        description:
            "I' Blu is a raw sheep's milk pecorino prepared by adding penicillium moulds to the curds that kick-starts during the aging period when the rind is pierced with pins. This results in a marbled blue-grey-green streaks paste with a creamy texture. It offers a pronounced taste and a unique aroma that pairs well with a sweet wine like Moscato or Passito.",
        image: "https://cheese.com/static/common/img/icon-cheese-default.svg",
        link: "https://cheese.com/i-blu/",
        name: "I' Blu",
        milks: ["sheep"],
        country_codes: ["IT"],
        __v: 0,
    },
];
// create a function that will seed the database with the first 100 cheeses
const seedDatabase = () => {
    // delete the cheeses from the database
    // Cheese.deleteMany({});
    // use the Cheese model to insert the cheeses into the database
    Cheese.insertMany(cheeses)
        .then(() => {
            console.log("cheeses seeded");
        })
        .catch((err) => {
            console.log(err);
        });
};

// export the seedDatabase function
module.exports = { seedDatabase };
