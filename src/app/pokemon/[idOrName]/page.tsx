import {
	fetchPokemonByIdOrName,
	fetchPokemonSpecies,
	fetchPokemonSpeciesCount,
} from "@/api/fetchPokeAPI";
import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getEvolutionChain } from "@/services/getEvolutionChain";
import { getTypeDetailTint } from "@/constants/pokemonTypeColors";
import { DetailHeader } from "@/components/pokedex/DetailHeader";
import { EvolutionThumbnail } from "@/components/pokedex/EvolutionThumbnail";
import { TypeChip } from "@/components/ui/TypeChip";
import { StatBar } from "@/components/ui/StatBar";

type Props = {
	params: Promise<{ idOrName: string }>;
};

const STAT_ORDER: { name: string; label: string }[] = [
	{ name: "hp", label: "HP" },
	{ name: "attack", label: "Attack" },
	{ name: "defense", label: "Defense" },
	{ name: "speed", label: "Speed" },
	{ name: "special-attack", label: "Sp. Atk" },
	{ name: "special-defense", label: "Sp. Def" },
];

export default async function SinglePokemon({ params }: Props) {
	const { idOrName } = await params;
	const pokemon: Pokemon = await fetchPokemonByIdOrName(idOrName);
	const mainType = pokemon.types[0].type.name;

	const species = await fetchPokemonSpecies(pokemon.species);

	const evolutionIds = await getEvolutionChain(pokemon.species);
	const evolutions = await Promise.all(
		evolutionIds
			.filter((id) => id !== pokemon.id)
			.map((id) => fetchPokemonByIdOrName(id)),
	);

	const lastPokemon = await fetchPokemonSpeciesCount();

	const prevId = pokemon.id > 1 ? pokemon.id - 1 : lastPokemon;
	const nextId = pokemon.id < lastPokemon ? pokemon.id + 1 : 1;

	return (
		<div className="mx-auto flex w-full max-w-[1180px] flex-col px-[4vw] sm:px-[5vw]">
			<div className="mt-5 mb-16 flex flex-col rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,.06),0_20px_50px_rgba(0,0,0,.08)] sm:mb-24">
				<div className="sticky top-0 z-20">
					<DetailHeader currentName={pokemon.name} />
				</div>

				<div className="flex items-center gap-2 rounded-b-2xl bg-white px-3 py-8 sm:px-6 sm:py-10">
					<Link
						href={`/pokemon/${prevId}`}
						className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
						aria-label="Previous Pokémon"
					>
						<ChevronLeft size={20} />
					</Link>

					<div className="flex flex-1 flex-col gap-9 px-2 sm:flex-row sm:px-6">
						{/* Left column */}

						<div className="flex w-full flex-col gap-5 sm:w-[340px] sm:shrink-0">
							<div
								className={`relative aspect-square w-full overflow-hidden rounded-[20px] ${getTypeDetailTint(mainType)}`}
							>
								<Image
									src={pokemon.sprites}
									alt={pokemon.name}
									fill
									sizes="340px"
									className="object-contain p-6"
									priority
								/>
							</div>
							{evolutions.length > 0 && (
								<div>
									<div className="mb-2.5 text-xs font-bold tracking-[0.04em] text-gray-500 uppercase">
										Evolutions
									</div>
									<div className="grid grid-cols-4 gap-2.5">
										{evolutions.map((evolution) => (
											<EvolutionThumbnail
												key={evolution.id}
												evolution={evolution}
											/>
										))}
									</div>
								</div>
							)}
						</div>

						{/* Right column */}

						<div className="flex flex-1 flex-col gap-6 pt-1">
							<div>
								<div className="text-[13px] font-bold text-gray-500">
									#{String(pokemon.id).padStart(3, "0")}
								</div>
								<div className="text-[28px] font-extrabold tracking-tight text-gray-900 capitalize sm:text-[34px]">
									{pokemon.name}
								</div>
								<div className="mt-2.5 flex gap-1.5">
									{pokemon.types.map((t) => (
										<TypeChip key={t.type.name} type={t.type.name} />
									))}
								</div>
							</div>

							{species.description && (
								<p className="text-[15px] leading-[1.7] text-gray-600">
									{species.description}
								</p>
							)}

							<div className="flex gap-8">
								<div>
									<div className="text-xs font-bold tracking-[0.04em] text-gray-500 uppercase">
										Height
									</div>
									<div className="mt-1 text-xl font-extrabold text-gray-800">
										{(pokemon.height / 10).toFixed(1)} m
									</div>
								</div>
								<div>
									<div className="text-xs font-bold tracking-[0.04em] text-gray-500 uppercase">
										Weight
									</div>
									<div className="mt-1 text-xl font-extrabold text-gray-800">
										{(pokemon.weight / 10).toFixed(1)} kg
									</div>
								</div>
							</div>

							<div>
								<div className="mb-3 text-[13px] font-bold tracking-[0.04em] text-gray-500 uppercase">
									Base stats
								</div>
								<div className="flex flex-col gap-3">
									{STAT_ORDER.map(({ name, label }) => {
										const stat = pokemon.stats.find(
											(s) => s.stat.name === name,
										);
										if (!stat) return null;
										return (
											<StatBar
												key={name}
												label={label}
												value={stat.base_stat}
												type={mainType}
											/>
										);
									})}
								</div>
							</div>
						</div>
					</div>

					<Link
						href={`/pokemon/${nextId}`}
						className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
						aria-label="Next Pokémon"
					>
						<ChevronRight size={20} />
					</Link>
				</div>
			</div>
		</div>
	);
}
