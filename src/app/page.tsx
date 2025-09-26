"use client"

import {fetchPokemonByIdOrName, fetchPokemonList, fetchPokemonSpeciesCount} from "@/api/pokemon";
import {useEffect, useState} from "react";
import {PokemonCard} from "@/components/PokemonCard";
import {getPokemonIdFromUrl} from "@/utils/getPokemonIdFromUrl";

export default function Home() {

    const [count, setCount] = useState(0);
    const [pokemonList, setPokemonList] = useState<PokemonListResult[]>([]);
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);

    useEffect(() => {
        const loadCount = async ()=> {
            try {
                const total = await fetchPokemonSpeciesCount();
                setCount(total);
            } catch (error) {
                console.error("Error loading total count of pokemon", error);
            }
        };
        loadCount();
    }, []);

    useEffect(() => {
        if (count === 0) return;

        const loadPokemonList = async () => {
            try {
                const response = await fetchPokemonList(count)
                setPokemonList(response.results)
            } catch (error) {
                console.log("Error loading pokemon list", error)
            }
        };
        loadPokemonList();
    }, [count])

    useEffect(() => {
        if (pokemonList.length === 0) return;

        const loadSinglePokemon = async (list: PokemonListResult[]) => {
            try {
                const response = await Promise.all(
                    list.map((pokemon)=> {
                        const id = getPokemonIdFromUrl(pokemon.url);
                        return fetchPokemonByIdOrName(id)
                    })
                );
                setPokemon((prev) => [...prev, ...response]);
            } catch (error) {
                console.log("Error loading pokemon", error)
            }
        };
        loadSinglePokemon(pokemonList);
    }, [pokemonList]);

  return (
      <div className={"m-2 grid grid-cols-6 gap-2"}>
          {pokemon?.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
      </div>
  )
}
