"use client";

import { useEffect, useState } from "react";
import { LayoutGrid, List as ListIcon } from "lucide-react";
import { usePokemonStore } from "@/store/pokemonStore";
import {
	fetchGeneration,
	fetchPokemonGenerations,
	fetchPokemonTypes,
} from "@/api/fetchPokeAPI";
import { PokemonGenerations, PokemonTypes } from "@/types/pokemon";
import { formatTypeName } from "@/constants/pokemonTypeColors";
import { toRoman } from "@/utils/toRoman";
import { PokeballLogo } from "@/components/pokedex/PokeballLogo";
import { FilterDropdown } from "@/components/pokedex/FilterDropdown";

export type BrowseView = "grid" | "list";

type Props = {
	query: string;
	onQueryChange: (value: string) => void;
	view: BrowseView;
	onViewChange: (view: BrowseView) => void;
};

export const BrowseHeader = ({
	query,
	onQueryChange,
	view,
	onViewChange,
}: Props) => {
	const {
		selectedType,
		setSelectedType,
		selectedGeneration,
		setSelectedGeneration,
	} = usePokemonStore();

	const [types, setTypes] = useState<PokemonTypes[]>([]);
	const [generations, setGenerations] = useState<PokemonGenerations[]>([]);
	const [regions, setRegions] = useState<string[]>([]);

	useEffect(() => {
		fetchPokemonTypes()
			.then(setTypes)
			.catch((error) => console.log("Error fetching pokemon types", error));
	}, []);

	useEffect(() => {
		const loadGenerations = async () => {
			try {
				const generationList = await fetchPokemonGenerations();
				setGenerations(generationList);
				const regionList = await Promise.all(
					generationList.map((generation) => fetchGeneration(generation.url)),
				);
				setRegions(regionList);
			} catch (error) {
				console.log("Error fetching pokemon generations", error);
			}
		};
		loadGenerations();
	}, []);

	const generationOptions = [
		{ id: "", label: "All generations" },
		...generations.map((generation, i) => ({
			id: generation.name,
			label: `Gen ${toRoman(i + 1)}${regions[i] ? ` — ${regions[i]}` : ""}`,
		})),
	];

	const typeOptions = [
		{ id: "", label: "All" },
		...types.map((type) => ({
			id: type.name,
			label: formatTypeName(type.name),
		})),
	];

	const selectedGenIndex = generations.findIndex(
		(g) => g.name === selectedGeneration,
	);
	const generationLabel =
		selectedGeneration && selectedGenIndex !== -1
			? `Gen ${toRoman(selectedGenIndex + 1)}`
			: "Generation";

	const typeLabel = selectedType ? formatTypeName(selectedType) : "All";

	return (
		<div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border-b border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 px-5 py-5 sm:flex-nowrap sm:gap-3.5 sm:px-8">
			<PokeballLogo />
			<input
				value={query}
				onChange={(e) => onQueryChange(e.target.value)}
				placeholder="Search Pokémon..."
				className="min-w-[120px] flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none focus:border-blue-600 sm:max-w-[280px]"
			/>
			<FilterDropdown
				label={generationLabel}
				options={generationOptions}
				activeId={selectedGeneration ?? ""}
				onSelect={(id) => setSelectedGeneration(id || null)}
				variant="brand"
			/>
			<FilterDropdown
				label={`Type: ${typeLabel}`}
				options={typeOptions}
				activeId={selectedType ?? ""}
				onSelect={(id) => setSelectedType(id || null)}
			/>
			<button
				type="button"
				onClick={() => {
					setSelectedGeneration(null);
					setSelectedType(null);
				}}
				className={`rounded-lg bg-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 ${selectedGeneration || selectedType ? "pointer-events-auto" : "pointer-events-none opacity-50"}`}
			>
				Clear filters
			</button>
			<div className="ml-auto flex gap-0.5 rounded-[10px] bg-gray-100 p-[3px]">
				<button
					type="button"
					title="Grid view"
					onClick={() => onViewChange("grid")}
					className={`flex h-[30px] w-[34px] cursor-pointer items-center justify-center rounded-lg transition-colors ${
						view === "grid" ? "bg-blue-600 text-white" : "text-gray-500"
					}`}
				>
					<LayoutGrid size={16} />
				</button>
				<button
					type="button"
					title="List view"
					onClick={() => onViewChange("list")}
					className={`flex h-[30px] w-[34px] cursor-pointer items-center justify-center rounded-lg transition-colors ${
						view === "list" ? "bg-blue-600 text-white" : "text-gray-500"
					}`}
				>
					<ListIcon size={16} />
				</button>
			</div>
		</div>
	);
};
