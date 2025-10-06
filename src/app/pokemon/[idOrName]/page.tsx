import {fetchPokemonByIdOrName, fetchPokemonSpeciesCount} from "@/api/fetchPokeAPI";
import {Pokemon} from "@/types/pokemon";
import Image from "next/image"
import {backgroundPokemonTypeColors} from "@/constants/backgroundPokemonTypeColors"
import {getEvolutionChain} from "@/services/getEvolutionChain";
import Link from "next/link";
import {ChevronLeft, ChevronRight} from "lucide-react";

type Props = {
    params: {idOrName: string | number};
}

export default async function SinglePokemon ({params}: Props) {

    const pokemon: Pokemon = await fetchPokemonByIdOrName(params.idOrName);
    const mainType = pokemon.types[0].type.name;
    const backgroundColor = backgroundPokemonTypeColors[mainType];

    const evolutionIds = await getEvolutionChain(pokemon.species);
    const evolutions = await Promise.all(
        evolutionIds.filter(id => id !== pokemon.id).map(id => fetchPokemonByIdOrName(id))
    )

    const lastPokemon = await fetchPokemonSpeciesCount()

    return (
        <div className={"h-screen flex items-center justify-center"}>

            {/* left arrow */}

            <Link href={pokemon.id > 1 ? `/pokemon/${pokemon.id - 1}` : "#"} className={pokemon.id === 1 ? "invisible" : ""}>
                <ChevronLeft className={"h-30 w-30 mr-20"} />
            </Link>


            {/* Card */}

            <div className={`border-3 border-black rounded-2xl flex ${backgroundColor} p-2 w-[50%] h-[75%]`}>

                {/* Images */}

                <div className={`flex-3 rounded-2xl ${evolutions.length !== 0 ? "divide-y divide-white" : ""}`}>
                    <div className={`${evolutions.length === 0 ? "h-full" : ""} w-[80%] m-auto flex items-center`}>
                        <Image
                            src={pokemon.sprites}
                            alt={pokemon.name}
                            className={`m-auto`}
                            width={450}
                            height={450}
                        />
                    </div>
                    <div className={`p-2 ${evolutions.length > 3 ? "grid grid-cols-4" : "flex justify-evenly items-center"}`}>
                        {evolutions.map((evolution, i) => (
                            <Link href={`/pokemon/${evolution.name}`} key={i} className={`m-auto`}>
                                <Image
                                    src={evolution.sprites}
                                    alt={evolution.name}
                                    width={evolutions.length > 3 ? 110 : 200}
                                    height={evolutions.length > 3 ? 110 : 200}
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Details */}

                <div className={`flex-1 p-5 flex flex-col justify-center gap-3 shadow-lg text-3xl font-bold font-mono capitalize divide-stone-400 divide-y bg-stone-100 rounded-2xl border-2 border-black`}>
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

            {/* right arrow */}

            <Link href={pokemon.id < lastPokemon ? `/pokemon/${pokemon.id + 1}` : "#"} className={pokemon.id === lastPokemon ? "invisible" : ""}>
                <ChevronRight className={"h-30 w-30 ml-20"}/>
            </Link>
        </div>
    )
}