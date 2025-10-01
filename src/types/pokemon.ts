export type PokemonList = {
    name: string;
    url: string
}

export type PokemonPreview = {
    id: number;
    name: string;
    sprites: string;
    types: {type: {name: string}}[],
};

export type Pokemon = {
    id: number;
    name: string;
    types: {type: {name: string}}[],
    height: number;
    weight: number;
    sprites: string;
    stats: {base_stat: number, stat: {name: string}}[];
    species: string,
}

export type PokemonSpecies = {
    evolution_chain: string,
}

export type PokemonEvolutionChain = {
    species: { url: string },
    evolves_to: PokemonEvolutionChain[],
}