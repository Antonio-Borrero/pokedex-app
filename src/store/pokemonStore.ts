import {create} from 'zustand'
import { persist } from 'zustand/middleware'
import {PokemonPreview} from "@/types/pokemon";

type PokemonStore = {
    pokemons: PokemonPreview[],
    setPokemons: (pokemon: PokemonPreview[]) => void,
}

export const usePokemonStore = create<PokemonStore>()(
    persist<PokemonStore>((set) => ({
            pokemons: [],
            setPokemons: (pokemons: PokemonPreview[]) => set({pokemons}),
        }),
        {
            name: "pokemon-storage",
        }
    )
);