import {fetchEvolutionChain} from "@/api/fetchPokeAPI"

describe("fetchEvolutionChain", () => {
    beforeEach(() => {
        (global.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    chain: {
                        species: { url: "https://pokeapi.co/api/v2/pokemon-species/2/" },
                        evolves_to: [
                            {
                                species: { url: "https://pokeapi.co/api/v2/pokemon-species/3/" },
                                evolves_to: [],
                            }
                            ],
                    }
                })
        }))
    })

    it("should return the url of the exolution species", async () => {
        const resp = await fetchEvolutionChain("https://pokeapi.co/api/v2/evolution-chain/1/");
        expect(resp).toEqual({
            species: { url: "https://pokeapi.co/api/v2/pokemon-species/2/"},
            evolves_to: [
                {
                    species: { url: "https://pokeapi.co/api/v2/pokemon-species/3/" },
                    evolves_to: [],
                },
            ]
        });
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/evolution-chain/1/");
    })

    it("should handle no evolutions", async () => {
        (global.fetch as jest.Mock) = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    chain: {
                        species: { url: "https://pokeapi.co/api/v2/pokemon_species/25/" },
                        evolves_to: [],
                    }
                })
        })
        ) as jest.Mock;

        const resp = await fetchEvolutionChain("https://pokeapi.co/api/v2/evolution-chain/25/");

        expect(resp).toEqual({
            species: { url: "https://pokeapi.co/api/v2/pokemon_species/25/" },
            evolves_to: [],
        })
    })

    it("should handle fetch errors", async () => {
        (global.fetch as jest.Mock) = jest.fn(() => Promise.reject(new Error("API error"))) as jest.Mock
        await expect(fetchEvolutionChain("missing")).rejects.toThrow("API error")
    })
})