import {getEvolutionChain} from "@/services/getEvolutionChain"

const mockSpeciesResponse = {evolution_chain: "https://pokeapi.co/api/v2/evolution-chain/1/"};
const mockEvolutionChainResponse = {
    species: {url: "https://pokeapi.co/api/v2/pokemon-species/1/"},
    evolves_to: [
        {
            species: {url: "https://pokeapi.co/api/v2/pokemon-species/2/"},
            evolves_to: [
                {
                    species: {url: "https://pokeapi.co/api/v2/pokemon-species/3/"},
                    evolves_to: []
                }
            ]
        }
]
}

describe("getEvolutionChain", () => {
    beforeEach(() => {
        (global.fetch as jest.Mock)= jest.fn((url: string) => {
            if (url.endsWith("/pokemon-species/1/")) {
                return Promise.resolve({json: () => Promise.resolve(mockSpeciesResponse)});
            }
            if (url.endsWith("/evolution-chain/1/")) {
                return Promise.resolve({json: () => Promise.resolve(mockEvolutionChainResponse)});
            }
            return Promise.reject("Unexpected url: " + url);
        })
    })

    it("should return a list of pokemon Ids", async () => {
        const response = await getEvolutionChain("https://pokeapi.co/api/v2/pokemon-species/1/");
        expect(response).toEqual([1, 2, 3])
        expect(fetch).toHaveBeenCalledTimes(2)
    })

    it("should handle fetch errors", async () => {
        (global.fetch as jest.Mock) = jest.fn(() => Promise.reject(new Error("API error"))) as jest.Mock
        await expect(getEvolutionChain("missing")).rejects.toThrow("API error")
    })
})