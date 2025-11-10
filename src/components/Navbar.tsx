"use client"

import {useState, useRef, ChangeEvent, FormEvent, useEffect} from "react";
import Image from "next/image";
import {Search} from "lucide-react"
import {usePokemonStore} from "@/store/pokemonStore";
import {backgroundPokemonTypeColors} from "@/constants/backgroundPokemonTypeColors";
import Link from "next/link";
import {useRouter} from "next/navigation";
import useClickOutside from "@/hooks/useClickOutside";
import {PokemonGenerations, PokemonTypes} from "@/types/pokemon";
import {fetchGeneration, fetchPokemonGenerations, fetchPokemonTypes} from "@/api/fetchPokeAPI";


export default function Navbar() {

    // store

    const {pokemons, selectedType ,setSelectedType, selectedGeneration, setSelectedGeneration} = usePokemonStore();

    // navigation

    const router = useRouter();

    // states

    const [input, setInput] = useState("");
    const [inputDropDown, setInputDropDown] = useState(false);
    const [types, setTypes] = useState<PokemonTypes[]>([]);
    const [typesDropDown, setTypesDropDown] = useState(false);
    const [generations, setGenerations] = useState<PokemonGenerations[]>([]);
    const [generationDropDown, setGenerationDropDown] = useState(false);
    const [regions, setRegions] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    // refs

    const searchRef = useRef<HTMLDivElement>(null);
    const typesRef = useRef<HTMLDivElement>(null);
    const generationRef = useRef<HTMLDivElement>(null);

    // dropdowns

    useClickOutside(searchRef, () => setInputDropDown(false));
    useClickOutside(typesRef, () => setTypesDropDown(false));
    useClickOutside(generationRef, () => setGenerationDropDown(false));

    // filter

    const filteredPokemon = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(input.toLowerCase()))

    // form submit

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const pokemonFound = pokemons.find((pokemon) => pokemon.name.toLowerCase() === input.toLowerCase());

        if (pokemonFound) {
            router.push(`/pokemon/${pokemonFound.name}`);
            setInput("");
            setInputDropDown(false);
            setError(null);
        } else {
            setError("Pokémon not found");
            setInputDropDown(false);
        }
    }

    // input value and dropdown

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
        setInputDropDown(value.length > 0);
    }

    // types button

    useEffect(() => {
        const loadTypes = async () => {
            try {
                const types = await fetchPokemonTypes();
                setTypes(types);
            } catch (error) {
                console.log("Error fetching pokemon types", error)
            }
        }
        loadTypes();
    }, []);

    // generations button

    useEffect (() => {
        const loadGenerations = async () => {
            try {
                const generations = await fetchPokemonGenerations();
                setGenerations(generations);

                const regions = await Promise.all(
                    generations.map(async (generation) => await fetchGeneration(generation.url))
                );
                setRegions(regions);

            } catch (error) {
                console.log("Error fetching pokemon generations", error)
            }
        }
        loadGenerations();
    }, [])

    return (
        <div className={"bg-amber-400 border-4 rounded-2xl m-[1vh] border-blue-800 h-[12vh] flex justify-evenly items-center"}>

            {/* logo */}

            <Link href={"/"} onClick={() => setSelectedType(null)}>
                <div className={"relative"}>
                    <Image
                        src="/logo.png"
                        alt={"Logo"}
                        width={200}
                        height={100}
                    />
            </div>
            </Link>

            {/* search input */}

            <form onSubmit={handleSubmit} className={"flex gap-2 items-center"}>
                <Search className={"rotate-90 h-[3.8vh] w-[3.8vh] text-2xl text-blue-800"}/>
                <div className={"relative"} ref={searchRef}>
                    <input
                        value={input}
                        onChange={handleInputChange}
                        className={"bg-white rounded-2xl w-[25vw] h-[4.5vh] border-blue-800 border-4 focus:outline-0 p-3 text-2xl capitalize font-normal "}
                        placeholder={"Search pokémon"}
                    />
                    {inputDropDown && filteredPokemon.length > 0 && (
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
                    {error && (
                        <p className={"absolute top-full text-red-600 text-xl font-bold pl-8 pt-1"}>
                            {error}
                        </p>
                    )}
                </div>
            </form>

            {/* types button */ }

            <div className={"relative"} ref={typesRef}>
                <button className={"border-4 border-blue-800 rounded-2xl text-2xl font-semibold p-1 px-8 text-white text-shadow-[2px_2px_2px_black]"} onClick={() => setTypesDropDown(prev => !prev)}>Types</button>
                {typesDropDown && (
                    <div>
                        <ul className={"absolute z-10 bg-stone-200 p-1 rounded-2xl mt-2 border-4 border-blue-800 flex flex-col gap-1 overflow-y-auto max-h-[40vh] dropdown"}>
                            {types.map((type, i) => (
                                <li key={i}
                                    className={`${backgroundPokemonTypeColors[type.name]} rounded-md text-2xl capitalize font-semibold p-2 text-white text-shadow-[2px_2px_2px_black] cursor-pointer`}
                                    onClick={() => {
                                        if (type.name === selectedType) {
                                            setSelectedType(null);
                                        } else {
                                            setSelectedType(type.name);
                                        }
                                    }}>
                                    <p>{type.name}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* generations button */ }

            <div className={"relative"} ref={generationRef}>
                <button className={"border-4 border-blue-800 rounded-2xl text-2xl font-semibold p-1 px-8 text-white text-shadow-[2px_2px_2px_black]"} onClick={() => setGenerationDropDown(prev => !prev)}>Generations</button>
                {generationDropDown && (
                    <div>
                        <ul className={"absolute z-10 bg-stone-200 p-1 rounded-2xl mt-2 border-4 border-blue-800 flex flex-col gap-1 overflow-y-auto max-h-[40vh] dropdown divide-y divide-stone-400"}>
                            {generations.map((generation, i) => (
                                <li key={i}
                                    className={`text-2xl capitalize font-semibold p-2 text-amber-400 text-outline-blue cursor-pointer whitespace-nowrap`}
                                    onClick={() => {
                                        if (generation.name === selectedGeneration) {
                                            setSelectedGeneration(null);
                                        } else {
                                            setSelectedGeneration(generation.name);
                                        }
                                    }}>
                                    <p>{i + 1} generation - {regions[i]}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}