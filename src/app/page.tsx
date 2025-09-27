"use client"

import {fetchPokemonByIdOrName, fetchPokemonList, fetchPokemonSpeciesCount} from "@/api/pokemon";
import {useEffect} from "react";
import {PokemonCard} from "@/components/PokemonCard";
import {getPokemonIdFromUrl} from "@/utils/getPokemonIdFromUrl";
import {usePokemonStore} from "@/store/pokemonStore";
import {PokemonList} from "@/types/pokemon";

export default function Home() {

    const {pokemons, setPokemons} = usePokemonStore();

    useEffect(() => {
        const loadData = async ()=> {

            if (pokemons.length > 0) return;

            try {
                const count = await fetchPokemonSpeciesCount();

                const pokemonList: PokemonList[] = await fetchPokemonList(count);

                const fullData = await Promise.all(
                    pokemonList.map(async (p: PokemonList) => {
                        const id = getPokemonIdFromUrl(p.url);
                        const data = await fetchPokemonByIdOrName(id);
                        return {
                            id: data.id,
                            name: data.name,
                            sprites: data.sprites,
                        };
                    })
                );
                setPokemons(fullData);
            } catch (error) {
                console.error("Error loading pokemons", error);
            }
        };
        loadData();
    }, [pokemons, setPokemons]);

  return (
      <div className={"m-2 grid grid-cols-6 gap-2"}>
          {pokemons?.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
      </div>
  )
}
