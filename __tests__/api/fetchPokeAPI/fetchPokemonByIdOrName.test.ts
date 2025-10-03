import {fetchPokemonByIdOrName} from "@/api/fetchPokeAPI"

function mockPokemonResponse(id: number, name: string, height: number, weight: number, sprite: string, statName: string, statValue: number, species: string) {
    return {
        json: async () => ({
            id,
            name,
            height,
            weight,
            sprites: {
                other: {
                    "official-artwork": {
                        front_default: sprite,
                    }
                }
            },
            stats: [
                {stat: {name: statName}, base_stat: statValue}],
            species: {url: species}
        }),
    } as Response
}

describe ("fetchPokemonByIdOrName", () => {
    beforeEach(() => {
        (global.fetch as jest.Mock) = jest.fn((url: string) => {
            if (url.endsWith("bulbasaur")) {
                return Promise.resolve(mockPokemonResponse(1, "bulbasaur", 7, 69, "bulbasaur.png", "hp", 45, "speciesUrl"))
            }

            if (url.endsWith("/1")) {
                return Promise.resolve(mockPokemonResponse(1, "bulbasaur", 7, 69, "bulbasaur.png", "hp", 45, "speciesUrl"))
            }

            return Promise.reject("Unexpected url " + url)
        }) as jest.Mock
    })

    it ("returns Bulbasaur details when called with name", async () => {
        const response = await fetchPokemonByIdOrName("bulbasaur")
        expect(response).toEqual({
            id: 1,
            name: "bulbasaur",
            height: 7,
            weight: 69,
            sprites: "bulbasaur.png",
            stats: [{base_stat: 45, stat: {name: "hp"}}],
            species: "speciesUrl"
        })
        expect(global.fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/bulbasaur")
    })

    it("returns Bulbasaur details when called with ID", async () => {
        const response = await fetchPokemonByIdOrName(1)
        expect(response).toEqual({
            id: 1,
            name: "bulbasaur",
            height: 7,
            weight: 69,
            sprites: "bulbasaur.png",
            stats: [{base_stat: 45, stat: {name: "hp"}}],
            species: "speciesUrl"
        })
        expect(global.fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/1")
    })

    it("handle fetch errors", async () => {
        (global.fetch as jest.Mock) = jest.fn(() => Promise.reject("API error")) as jest.Mock
        await expect(fetchPokemonByIdOrName("missing")).rejects.toEqual("API error")
    })
})