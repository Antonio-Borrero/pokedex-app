import {fetchPokemonByIdOrName} from "@/api/fetchPokeAPI";
import {Pokemon} from "@/types/pokemon";
import Image from "next/image"
import {backgroundPokemonTypeColors} from "@/constants/backgroundPokemonTypeColors"
import {getEvolutionChain} from "@/services/getEvolutionChain";
import Link from "next/link";

type Props = {
    params: {idOrName: string | number};
}

export default async function SinglePokemon ({params}: Props) {

    const pokemon: Pokemon = await fetchPokemonByIdOrName(params.idOrName);
    const mainType = pokemon.types[0].type.name;
    const backgroundColor = backgroundPokemonTypeColors[mainType];

    const evolutionIds = await getEvolutionChain(pokemon.species);
    const evolutions = await Promise.all(
        evolutionIds.map(id => fetchPokemonByIdOrName(id))
    )

    return (
        <div className={"h-screen flex items-center justify-center"}>

            {/* Card */}

            <div className={`border-3 border-black rounded-2xl flex ${backgroundColor} p-2 gap-8`}>

                {/* Images */}
                <div className={"flex-3 rounded-2xl divide-y divide-stone-400"}>
                    <Image
                        src={pokemon.sprites}
                        alt={pokemon.name}
                        className={"m-auto"}
                        width={450}
                        height={450} />
                    <div className={"flex divide-x divide-stone-400 p-2"}>
                        {evolutions.map((evolution, i) => (
                            <Link href={`/pokemon/${evolution.name}`} key={i}>
                                <Image
                                    src={evolution.sprites}
                                    alt={evolution.name}
                                    width={200}
                                    height={200} />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Details */}

                <div className={`flex-1 p-5 flex flex-col justify-center gap-3 shadow-lg text-3xl font-bold font-mono capitalize divide-stone-400 divide-y bg-stone-100 rounded-2xl`}>
                    <h2 className={"pb-2"}>ID: {pokemon.id}</h2>
                    <h2 className={"pb-2"}>Name: {pokemon.name}</h2>
                    <div className="flex items-center gap-3 text-3xl pb-2">
                        <h2 className="font-bold">Type:</h2>
                        {pokemon.types.map((type, index) => (
                            <span key={index} className={`${backgroundPokemonTypeColors[type.type.name]} border-2 border-black p-1 rounded-lg text-2lg text-white text-shadow-[2px_2px_2px_black]`}>
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                    <h2 className={"pb-2"}>Height: {pokemon.height}</h2>
                    <h2 className={"pb-2"}>Weight: {pokemon.weight}</h2>
                    <h2 className={"pb-2"}>Stats:</h2>
                    <ul className={"ml-10"}>
                        {pokemon.stats.map((stat, index) => (
                            <li key={index} className={`flex whitespace-nowrap text-2xl text`}>{stat.stat.name}: {stat.base_stat}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}