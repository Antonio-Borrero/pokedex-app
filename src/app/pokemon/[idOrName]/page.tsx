import {fetchPokemonByIdOrName} from "@/api/fetchPokeAPI";
import {Pokemon} from "@/types/pokemon";
import Image from "next/image"
import {pokemonTypeColors} from "@/constants/pokemonTypeColors"

type Props = {
    params: {idOrName: string | number};
}

export default async function SinglePokemon ({params}: Props) {

    const pokemon: Pokemon = await fetchPokemonByIdOrName(params.idOrName);
    const mainType = pokemon.types[0].type.name;
    const typeColor = pokemonTypeColors[mainType]

    return (
        <div className={"h-screen flex items-center justify-center"}>
            <div className={`border-8 border-black rounded-2xl flex ${typeColor}`}>
                <div className="flex-3 rounded-r-2xl flex items-center justify-center">
                    <Image
                        src={pokemon.sprites}
                        alt={pokemon.name}
                        className={""}
                        width={500}
                        height={500} />
                </div>
                <div className={`flex-1 p-5 flex flex-col justify-center gap-3 shadow-lg text-3xl font-bold font-mono capitalize bg-stone-200 rounded-2xl`}>
                    <h2>Pokedex: {pokemon.id}</h2>
                    <h2>Name: {pokemon.name}</h2>
                    <div className="flex items-center gap-3 text-3xl">
                        <h2 className="font-bold">Type:</h2>
                        {pokemon.types.map((type, index) => (
                            <span key={index} className={`${pokemonTypeColors[type.type.name]} border p-1 rounded-lg text-2lg`}>
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                    <h2>Height: {pokemon.height}</h2>
                    <h2>Weight: {pokemon.weight}</h2>
                    <h2>Stats:</h2>
                    <ul className={"ml-10"}>
                        {pokemon.stats.map((stat, index) => (
                            <li key={index} className={`flex whitespace-nowrap text-2xl`}>{stat.stat.name}: {stat.base_stat}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}