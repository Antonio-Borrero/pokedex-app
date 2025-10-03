import {extractIdsFromChain} from "@/services/getEvolutionChain"

const mockEvolutionChain = {
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

const mockNoEvolution = {
    species: {url: "https://pokeapi.co/api/v2/pokemon-species/115/"},
    evolves_to: []
}

const mockBranchEvolutions = {
    species: {url: "https://pokeapi.co/api/v2/pokemon-species/133/"},
    evolves_to: [
        {
            species: {url: "https://pokeapi.co/api/v2/pokemon-species/134/"},
            evolves_to: [],
        },
        {
            species: {url: "https://pokeapi.co/api/v2/pokemon-species/135/"},
            evolves_to: [],
        },
        {
            species: {url: "https://pokeapi.co/api/v2/pokemon-species/136/"},
            evolves_to: []
        }
    ]
}

describe("extractIdsFromChain", () => {
    it("should extract ids from evolution chain", () => {
        expect(extractIdsFromChain(mockEvolutionChain)).toEqual([1, 2, 3])
    })
    it("should handle no evolutions", () => {
        expect(extractIdsFromChain(mockNoEvolution)).toEqual([115])
    })
    it("should handle branch evolutions", () => {
        expect(extractIdsFromChain(mockBranchEvolutions)).toEqual([133, 134, 135, 136])
    })
})