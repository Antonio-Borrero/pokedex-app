"use client"

import {fetchPokemonByIdOrName, fetchPokemonList, fetchPokemonSpeciesCount} from "@/api/fetchPokeAPI";
import {useCallback, useEffect, useState} from "react";
import {PokemonCard} from "@/components/PokemonCard";
import {getPokemonIdFromUrl} from "@/utils/getPokemonIdFromUrl";
import {usePokemonStore} from "@/store/pokemonStore";
import {PokemonList} from "@/types/pokemon";
import {useInfiniteScroll} from "@/hooks/useInfiniteScroll";


export default function Home() {

    const {pokemons, setPokemons} = usePokemonStore();
    const [visibleCount, setVisibleCount] = useState(18);


    const loadMore = useCallback(() => {
        setVisibleCount((prev) => Math.min(prev + 18, pokemons.length));
    }, [pokemons.length])

    const sentinelRef = useInfiniteScroll(loadMore);

    useEffect(() => {
        const fetchData = async ()=> {

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
        fetchData();
    }, [pokemons, setPokemons]);

  return (
      <div className={"m-2 grid grid-cols-6 gap-2"}>
          {pokemons?.slice(0, visibleCount).map((pokemon) =>
              <PokemonCard pokemon={pokemon} key={pokemon.id}/>
          )}
          {<div ref={sentinelRef} className={"h-10 col-span-6"} />}
      </div>
  )
}
