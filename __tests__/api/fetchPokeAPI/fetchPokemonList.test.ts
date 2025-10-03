import {fetchPokemonList} from "@/api/fetchPokeAPI"

function mockPokemonList(count: number) {
    const results = Array.from({length: count}, (_,i) => ({
        name: `pokemon${i + 1}`,
        url: `https://pokeapi.co/api/v2/pokemon-species/${i + 1}/`,
    }));
    return {
        json: async () => ({count, results})
    } as Response
}

describe ("fetch Pokemon List", () => {
    describe ("normal list", () => {
        beforeEach (() => {
            (global.fetch as jest.Mock) = jest.fn((url:string) => {
                const match = url.match(/limit=(\d+)/)
                const count = match ? parseInt(match[1]) : 1
                return Promise.resolve(mockPokemonList(count))
            }) as jest.Mock
        })

        it("should return a list of 50 pokemon", async () => {
            const result = await fetchPokemonList(50)
            expect(Array.isArray(result)).toBe(true)
            expect(result.length).toBe(50)
            expect(result[0]).toEqual({
                name: "pokemon1",
                url: "https://pokeapi.co/api/v2/pokemon-species/1/",
            })
            expect(global.fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon-species/?limit=50&offset=0")
        })
    })

    describe ("empty list", () => {
        beforeEach(() => {
            (global.fetch as jest.Mock) = jest.fn(() =>
                Promise.resolve({
                    json: async () => ({count: 0, results: []}),
                } as Response)
            ) as jest.Mock
        })

        it("should return an empty array if API return no results", async () => {
            const result = await fetchPokemonList(0)
            expect(Array.isArray(result)).toBe(true)
            expect(result).toEqual([])
            expect(global.fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon-species/?limit=0&offset=0")
        })
    })

    describe ("fetch errors", () => {
        beforeEach(() => {
            (global.fetch as jest.Mock) = jest.fn(() =>
                Promise.reject("API error")
            ) as jest.Mock
        })

        it ("should return an error if API returns an error", async () => {
            await expect(fetchPokemonList(5)).rejects.toEqual("API error")
        })
    })
})