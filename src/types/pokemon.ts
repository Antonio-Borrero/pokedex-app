export type PokemonList = {
    next: string;
    results: PokemonListResult[]
}

export type PokemonListResult = {
    name: string;
    url: string
}

export type Pokemon = {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        other: {
            "official-artwork": {
                front_default: string
            }
        }
    };
    stats: {
        base_stat: number;
        stat: {name: string}
    }[];
}