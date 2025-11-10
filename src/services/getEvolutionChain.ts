import {fetchEvolutionChain, fetchPokemonSpecies} from "@/api/fetchPokeAPI";
import {PokemonEvolutionChain} from "@/types/pokemon";
import {getPokemonIdFromUrl} from "@/utils/getPokemonIdFromUrl";

export const extractIdsFromChain = (chain: PokemonEvolutionChain): number[] => {
    const currentPokemonId = getPokemonIdFromUrl(chain.species.url);
    const evolutionsId = chain.evolves_to.flatMap(Evolution => extractIdsFromChain(Evolution));
    return [currentPokemonId, ...evolutionsId].filter((id): id is number => id !== undefined);
}

export const getEvolutionChain = async (url: string) => {
    const pokemonSpecies = await fetchPokemonSpecies(url);
    const evolutionChain = await fetchEvolutionChain(pokemonSpecies.evolution_chain);
    return extractIdsFromChain(evolutionChain)
}