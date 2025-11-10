import {usePokemonData} from "@/hooks/usePokemonData"
import * as PokeAPI from "@/api/fetchPokeAPI";
import {usePokemonStore} from "@/store/pokemonStore";
import {renderHook, waitFor} from "@testing-library/react";


jest.mock("@/api/fetchPokeAPI", () => {
    const mockPokemonList = Array.from({ length: 25 }, (_, i) => ({
        name: `pokemon-${i + 1}`,
        url: `https://pokeapi.co/api/v2/pokemon-species/${i + 1}`
    }))

    return {
        fetchPokemonSpeciesCount: jest.fn().mockResolvedValue(25),
        fetchPokemonList: jest.fn().mockResolvedValue(mockPokemonList),
        fetchPokemonByIdOrName: jest.fn().mockImplementation((id: number) => ({
            id,
            name: `pokemon-${id}`,
            sprites: "sprites",
            types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
            generation: "generation-i"
        }))
    }
})


const mockFetchSpeciesCount = jest.mocked(PokeAPI.fetchPokemonSpeciesCount)
const mockFetchPokemonList = jest.mocked(PokeAPI.fetchPokemonList)
const mockFetchByIdOrName = jest.mocked(PokeAPI.fetchPokemonByIdOrName)

describe("usePokemonData", () => {
    beforeEach(() => {
        usePokemonStore.setState({ pokemons: [] })
        mockFetchSpeciesCount.mockClear()
        mockFetchPokemonList.mockClear()
        mockFetchByIdOrName.mockClear()
    })

    it("should upload the pokemon to the store", async () => {
        renderHook(() => usePokemonData())

        await waitFor(() => {
            const {pokemons} = usePokemonStore.getState()
            expect(pokemons.length).toBe(25)
            expect(pokemons[0].name).toBe("pokemon-1")
            expect(pokemons[1].name).toBe("pokemon-2")
        })

        expect(mockFetchSpeciesCount).toHaveBeenCalledTimes(1)
        expect(mockFetchPokemonList).toHaveBeenCalledTimes(1)
        expect(mockFetchByIdOrName).toHaveBeenCalledTimes(25)
    })

    it("should skip fetch of a pokemon already in the store", async () => {
        usePokemonStore.setState({
            pokemons: [{id: 1, name: "bulbasaur", sprites: "sprites", types: [{type: {name: "grass"}}, {type: {name: "poison"}}], generation: "generation-i"}],
        })

        renderHook(() => usePokemonData())

        await waitFor(() => {
            const {pokemons} = usePokemonStore.getState()
            expect(pokemons.length).toBe(1)
            expect(pokemons[0].name).toBe("bulbasaur")
        })

        expect(mockFetchSpeciesCount).not.toHaveBeenCalled()
        expect(mockFetchPokemonList).not.toHaveBeenCalled()
        expect(mockFetchByIdOrName).not.toHaveBeenCalled()
    })
})