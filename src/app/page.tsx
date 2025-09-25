"use client"

import {fetchPokemonList} from "@/api/pokemon";
import {useEffect, useState} from "react";

export default function Home() {

    const [pokemonList, setPokemonList] = useState<PokemonListResult[] | null>(null);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon-species/?limit=20&offset=0");

    const loadPokemonList = async () => {
        try {
            const response = await fetchPokemonList(url)
            setPokemonList(response.results)
            setUrl(response.next)
        } catch (error) {
            console.log("Error loading pokemon list", error)
        }
    }

    useEffect(() => {
        loadPokemonList();
    }, [])

  return (
      <div>
          <ul>
              {pokemonList?.map((pokemon: PokemonListResult) => (
                  <li key={pokemon.name}>{pokemon.name}</li>
              ))}
          </ul>
      </div>
  )
}
