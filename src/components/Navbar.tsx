"use client"

import {useState} from "react";
import Image from "next/image";
import {Search} from "lucide-react"
import {usePokemonStore} from "@/store/pokemonStore";
import {backgroundPokemonTypeColors} from "@/constants/backgroundPokemonTypeColors";
import Link from "next/link";

export default function Navbar() {

    const {pokemons} = usePokemonStore();
    const [input, setInput] = useState("");
    const [dropDown, setDropDown] = useState(false);

    const filteredPokemon = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(input.toLowerCase()))

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);
        setDropDown(value.length > 0);
    }

    return (
        <div className={"bg-amber-400 border-4 rounded-2xl m-[1vh] border-blue-800 h-[10vh] flex justify-evenly items-center"}>
            <Link href={"/"}>
                <div>
                    <Image
                        src=""
                        alt={"Logo"}
                        width={200}
                        height={200}
                    />
                    Home
            </div>
            </Link>
            <form onSubmit={handleSubmit} className={"flex gap-2 items-center"}>
                <Search className={"rotate-90 h-[3.8vh] w-[3.8vh] text-2xl text-blue-800"}/>
                <div className={"relative"}>
                    <input
                        value={input}
                        onChange={handleInputChange}
                        className={"bg-white rounded-2xl w-[25vw] h-[3.8vh] border-blue-800 border-4 focus:outline-0 p-3 text-2xl capitalize font-normal "}
                    />
                    {dropDown && filteredPokemon.length > 0 && (
                        <div className={""}>
                            <ul className={"absolute z-10 bg-stone-200 p-1 rounded-2xl mt-2 border-4 border-blue-800 w-[15vw] flex flex-col gap-1 overflow-y-auto max-h-[40vh] dropdown"}>
                                {filteredPokemon.map((pokemon, i) => (
                                    <Link key={i} href={`/pokemon/${pokemon.name}`}>
                                        <li className={`flex items-center ${backgroundPokemonTypeColors[pokemon.types[0].type.name]} rounded-2xl p-1 border-3 border-black`}>
                                            <Image src={pokemon.sprites} alt={"Pokemon"} width={100} height={100} />
                                            <span className={"text-2xl text-white drop-shadow-[2px_2px_2px_black] capitalize"}>{pokemon.id}. {pokemon.name}</span>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </form>
            <button>Types</button>
            <button>Generation</button>
            <button>Login</button>
        </div>
    )
}