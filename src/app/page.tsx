"use client"

import {usePokemonStore} from "@/store/pokemonStore";
import {usePokemonData} from "@/hooks/usePokemonData";
import {useScrollRestore} from "@/hooks/useScrollRestore";
import {useCallback} from "react";
import {PokemonCard} from "@/components/PokemonCard";
import {useInfiniteScroll} from "@/hooks/useInfiniteScroll";

export default function Home() {

    const {pokemons, visibleCount, setVisibleCount} = usePokemonStore();

    usePokemonData();
    useScrollRestore()

    const loadMore = useCallback(() => {
        setVisibleCount(Math.min(visibleCount + 18, pokemons.length));
    }, [visibleCount, pokemons.length, setVisibleCount])

    const sentinelRef = useInfiniteScroll(loadMore);

  return (
      <div className={"m-2 grid grid-cols-6 gap-2"}>
          {pokemons?.slice(0, visibleCount).map((pokemon) =>
              <PokemonCard pokemon={pokemon} key={pokemon.id}/>
          )}
          {<div ref={sentinelRef} className={"h-10 col-span-6"} />}
      </div>
  )
}
