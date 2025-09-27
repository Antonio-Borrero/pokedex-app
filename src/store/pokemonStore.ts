import {create} from 'zustand'
import {PokemonPreview} from "@/types/pokemon";

type PokemonStore = {
    pokemons: PokemonPreview[],
    setPokemons: (pokemon: PokemonPreview[]) => void,
}
export const usePokemonStore = create<PokemonStore>((set) => ({
    pokemons: [],
    setPokemons: (pokemons: PokemonPreview[]) => set({pokemons}),
}))