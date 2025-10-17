import {PokemonPreview} from "@/types/pokemon"
import Link from "next/link"
import Image from "next/image"
import {backgroundPokemonTypeColors} from "@/constants/backgroundPokemonTypeColors";

type props = {
    pokemon: PokemonPreview
}

export const PokemonCard = ({pokemon}: props) => {

    const mainType = pokemon.types[0].type.name;
    const backgroundColors = backgroundPokemonTypeColors[mainType];

    return (
        <div className={`border-3 border-black rounded-2xl ${backgroundColors} `}>
            <Link href={`/pokemon/${pokemon.name}`}>
                <Image
                    src={pokemon.sprites}
                    alt={pokemon.name}
                    className={"m-auto"}
                    width={300} height={300}
                    priority={false} />
                <div className={"flex gap-2 justify-center text-3xl text-white text-shadow-[2px_2px_2px_black] capitalize pb-2"}>
                    <h2 className={""}>{pokemon.id}.</h2>
                    <h2>{pokemon.name}</h2>
                </div>
            </Link>
        </div>
    )
}