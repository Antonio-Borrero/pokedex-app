export const getPokemonIdFromUrl = (url: string): number | undefined => {
    const parts = url.split('/').filter(Boolean);
    const last = parts[parts.length - 1];
    const id = Number(last)
    return isNaN(id) ? undefined : id
}