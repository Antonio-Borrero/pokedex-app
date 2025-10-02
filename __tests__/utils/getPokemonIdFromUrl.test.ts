import {getPokemonIdFromUrl} from "@/utils/getPokemonIdFromUrl";

describe("getPokemonIdFromUrl", () => {
    it ("should return a PokemonID from the url with trailing slash", () => {
        expect(getPokemonIdFromUrl("https://pokeapi.co/api/v2/pokemon-species/1/")).toBe(1);
    })

    it ("should return a PokemonID from the url without trailing slash", () => {
        expect(getPokemonIdFromUrl("https://pokeapi.co/api/v2/pokemon-species/2")).toBe(2);
    })

    it("should handle an empty url", () => {
        expect(getPokemonIdFromUrl("")).toBe(undefined);
    })
})