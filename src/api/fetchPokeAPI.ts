import {PokemonList, Pokemon, PokemonSpecies, PokemonEvolutionChain} from "@/types/pokemon"

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
        stats: data.stats,
        species: data.species.url
    }
}

export const fetchPokemonSpecies = async (url: string): Promise<PokemonSpecies> => {
    const resp = await fetch(url);
    const data = await resp.json();
    return { evolution_chain: data.evolution_chain.url }
}

export const fetchEvolutionChain = async (url: string): Promise<PokemonEvolutionChain> => {
    const resp = await fetch(url);
    const data = await resp.json();
    return data.chain
}