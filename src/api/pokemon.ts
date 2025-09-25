export const fetchPokemonList = async (url: string): Promise<PokemonList> => {
    const resp = await fetch(url);
    return await resp.json();
}