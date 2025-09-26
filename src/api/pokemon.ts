export const fetchPokemonSpeciesCount = async (): Promise<number> => {
    const resp = await fetch("https://pokeapi.co/api/v2/pokemon-species");
    const data = await resp.json();
    return data.count;
}

export const fetchPokemonList = async (count: number): Promise<PokemonList> => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=${count}&offset=0`);
    return await resp.json();
}

export const fetchPokemonByIdOrName = async (idOrName: string | number): Promise<Pokemon> => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)
    return await resp.json();
}