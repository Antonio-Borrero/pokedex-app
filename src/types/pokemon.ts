export type PokemonList = {
    name: string;
    url: string
}

export type PokemonPreview = {
    id: number;
    name: string;
    sprites: string;
};

export type Pokemon = {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: string;
    stats: {name: string, base_stat: number}[];
}