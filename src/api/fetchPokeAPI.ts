import {PokemonList, Pokemon} from "@/types/pokemon"

export const fetchPokemonSpeciesCount = async (): Promise<number> => {
    const resp = await fetch("https://pokeapi.co/api/v2/pokemon-species");
    const data = await resp.json();
    return data.count;
}

export const fetchPokemonList = async (count: number): Promise<PokemonList[]> => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=${count}&offset=0`);
    const data = await resp.json();
    return data.results;
}

export const fetchPokemonByIdOrName = async (idOrName: string | number): Promise<Pokemon> => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)
    const data = await resp.json();
    return {
        id: data.id,
        name: data.name,
        types: data.types,
        height: data.height,
        weight: data.weight,
        sprites: data.sprites.other["official-artwork"].front_default,
        stats: data.stats
    }
}