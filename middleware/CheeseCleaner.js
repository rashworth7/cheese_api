// make a DTO for the api return cheese object to the cheese display object
class CheeseCleaner {
    constructor(data) {
        this.cheeseId = data._id
        this.name = data.name || "";
        this.type = data.attributes.types || [];
        this.description = data.description || "";
        this.flavour = data.attributes.flavors[0] || "";
        this.family = data.attributes.family || "";
        this.aromas = data.attributes.aromas || [];
        this.region = data.attributes.region || "";
        this.countries = data.attributes.countries || [];
        this.milks = data.milks || [];
        this.image = data.image || "";
        this.vegetarian = data.attributes.vegetarian || false;
    }
}

module.exports = CheeseCleaner;
