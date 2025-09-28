import {PokemonPreview} from "@/types/pokemon"
import Link from "next/link"

type props = {
    pokemon: PokemonPreview
}

export const PokemonCard = ({pokemon}: props) => {
    return (
        <div className={"border-4 border-blue-800 rounded-2xl"}>
            <Link href={`pokemon/${pokemon.name}`}>
                <img src={pokemon.sprites} alt={pokemon.name} className={""} />
                <div className={"flex gap-2 justify-center"}>
                    <h2>{pokemon.id}.</h2>
                    <h2>{pokemon.name}</h2>
                </div>
            </Link>
        </div>
    )
}