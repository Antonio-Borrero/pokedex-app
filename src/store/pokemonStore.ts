import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import {PokemonPreview} from "@/types/pokemon";

type PokemonStore = {
    pokemons: PokemonPreview[],
    setPokemons: (pokemon: PokemonPreview[]) => void,
    visibleCount: number,
    setVisibleCount: (count: number) => void,
    scrollY: number,
    setScrollY: (y: number) => void,
    selectedType: string | null,
    setSelectedType: (type: string | null) => void,
    selectedGeneration: string | null,
    setSelectedGeneration: (generation: string | null) => void,
}

export const usePokemonStore = create<PokemonStore>()(
    persist((set) => ({
            pokemons: [],
            setPokemons: (pokemons: PokemonPreview[]) => set({pokemons}),
            visibleCount: 18,
            setVisibleCount: (count) => set({visibleCount: count}),
            scrollY: 0,
            setScrollY: (y) => set({scrollY: y}),
            selectedType: null,
            setSelectedType: (type) => set({selectedType: type}),
            selectedGeneration: null,
            setSelectedGeneration: (generation) => set({selectedGeneration: generation}),
        }),
        {
            name: "pokemon-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state): Partial<PokemonStore> => ({
                pokemons: state.pokemons,
            })
        }
    )
);