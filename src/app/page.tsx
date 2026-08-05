"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePokemonStore } from "@/store/pokemonStore";
import { usePokemonData } from "@/hooks/usePokemonData";
import { useScrollRestore } from "@/hooks/useScrollRestore";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { BrowseHeader, BrowseView } from "@/components/pokedex/BrowseHeader";
import { PokemonGridCard } from "@/components/pokedex/PokemonGridCard";
import { PokemonListRow } from "@/components/pokedex/PokemonListRow";
import { QuickViewDrawer } from "@/components/pokedex/QuickViewDrawer";

export default function Home() {
	const {
		pokemons,
		visibleCount,
		setVisibleCount,
		selectedType,
		setSelectedType,
		selectedGeneration,
		setSelectedGeneration,
	} = usePokemonStore();

	usePokemonData();
	useScrollRestore();

	const [query, setQuery] = useState("");
	const [view, setView] = useState<BrowseView>("grid");
	const [selectedId, setSelectedId] = useState<number | null>(null);

	const loadMore = useCallback(() => {
		setVisibleCount(Math.min(visibleCount + 18, pokemons.length));
	}, [visibleCount, pokemons.length, setVisibleCount]);

	const sentinelRef = useInfiniteScroll(loadMore);

	const filteredPokemons = useMemo(
		() =>
			pokemons.filter((pokemon) => {
				const matchesType =
					!selectedType ||
					pokemon.types.some((type) => type.type.name === selectedType);
				const matchesGeneration =
					!selectedGeneration || pokemon.generation === selectedGeneration;
				const matchesQuery = pokemon.name
					.toLowerCase()
					.includes(query.trim().toLowerCase());

				return matchesType && matchesGeneration && matchesQuery;
			}),
		[pokemons, selectedType, selectedGeneration, query],
	);

	const selectedPokemon = useMemo(
		() => pokemons.find((pokemon) => pokemon.id === selectedId) ?? null,
		[pokemons, selectedId],
	);

	useEffect(() => {
		setSelectedType(null);
		setSelectedGeneration(null);
	}, [setSelectedType, setSelectedGeneration]);

	return (
		<div className="mx-auto flex w-full max-w-[1180px] flex-col px-[4vw] sm:px-[5vw]">
			<div className="sticky top-0 z-20">
				<BrowseHeader
					query={query}
					onQueryChange={setQuery}
					view={view}
					onViewChange={setView}
				/>
			</div>

			<div className="py-6 sm:py-8">
				{view === "grid" ? (
					<div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-[18px]">
						{filteredPokemons.slice(0, visibleCount).map((pokemon) => (
							<PokemonGridCard
								key={pokemon.id}
								pokemon={pokemon}
								onSelect={setSelectedId}
							/>
						))}
					</div>
				) : (
					<div className="flex flex-col gap-0.5">
						{filteredPokemons.slice(0, visibleCount).map((pokemon) => (
							<PokemonListRow
								key={pokemon.id}
								pokemon={pokemon}
								onSelect={setSelectedId}
							/>
						))}
					</div>
				)}
				<div ref={sentinelRef} className="h-10" />
			</div>

			<QuickViewDrawer
				pokemon={selectedPokemon}
				onClose={() => setSelectedId(null)}
			/>
		</div>
	);
}
