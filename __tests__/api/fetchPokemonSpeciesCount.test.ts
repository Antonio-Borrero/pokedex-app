import {fetchPokemonSpeciesCount} from "@/api/fetchPokeAPI";

describe ("fetchPokemonSpeciesCount", () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({count: 1000}),
            } as Response )
        ) as jest.Mock
    })

    it ("should return the count of pokemon", async () => {
        const result = await fetchPokemonSpeciesCount()
        expect(result).toBe(1000)
        expect(global.fetch).toHaveBeenCalledTimes(1)
        expect(global.fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon-species")
    })
})