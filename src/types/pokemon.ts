type PokemonList = {
    next: string;
    results: PokemonListResult[]
}

type PokemonListResult = {
    name: string;
    url: string
}