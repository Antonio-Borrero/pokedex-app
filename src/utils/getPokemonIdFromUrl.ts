export const getPokemonIdFromUrl = (url: string) => {
    const parts = url.split('/').filter(Boolean);
    return Number(parts[parts.length - 1]);
}