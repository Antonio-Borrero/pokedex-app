import {fetchPokemonSpecies} from "@/api/fetchPokeAPI"

describe("Fetch Pokemon Species", () => {
    beforeEach(() => {
        (global.fetch as jest.Mock) = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        evolution_chain: {url: "https://pokeapi.co/api/v2/evolution-chain/1/"},
                        generation: {name: "generation-i"},
                })
            })
        )
    })

    it ("should return the url of pokemon evolution chain", async () => {
        const resp = await fetchPokemonSpecies("https://pokeapi.co/api/v2/pokemon_species/1/")
        expect(resp).toEqual({
            evolution_chain: "https://pokeapi.co/api/v2/evolution-chain/1/",
            generation: "generation-i",
        });
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon_species/1/")
    });

    it("should handle fetch errors", async () => {
        (global.fetch as jest.Mock) = jest.fn(() => Promise.reject(new Error("API error"))) as jest.Mock;
        await expect(fetchPokemonSpecies("missing")).rejects.toThrow("API error")
    })
})