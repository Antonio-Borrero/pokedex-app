import {useEffect} from "react";
import {usePokemonStore} from "@/store/pokemonStore";
import {
    fetchPokemonSpeciesCount,
    fetchPokemonList,
    fetchPokemonByIdOrName,
    fetchPokemonSpecies,
} from "@/api/fetchPokeAPI";
import {getPokemonIdFromUrl} from "@/utils/getPokemonIdFromUrl";
import {PokemonList} from "@/types/pokemon";

export const usePokemonData = () => {
    const {pokemons, setPokemons} = usePokemonStore();

    useEffect(() => {
        const fetchData = async ()=> {

            if (pokemons.length > 0) return;

            try {
                const count = await fetchPokemonSpeciesCount();

                const pokemonList: PokemonList[] = await fetchPokemonList(count);

                const fullData = await Promise.all(
                    pokemonList.map((p: PokemonList) => {
                        const id = getPokemonIdFromUrl(p.url);
                        if (id === undefined) return null;
                        return id
                    }).filter((id): id is number => id !== null).map(async (id) => {
                        const data = await fetchPokemonByIdOrName(id);
                        const generation = await fetchPokemonSpecies(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
                        return {
                            id: data.id,
                            name: data.name,
                            sprites: data.sprites,
                            types: data.types,
                            generation: generation.generation,
                        };
                    })
        );
                setPokemons(fullData);
            } catch (error) {
                console.log("Error loading pokemons", error);
            }
        };
        fetchData();
    }, [pokemons, setPokemons]);
}