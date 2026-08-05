"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePokemonStore } from "@/store/pokemonStore";
import useClickOutside from "@/hooks/useClickOutside";
import { PokeballLogo } from "@/components/pokedex/PokeballLogo";

type Props = {
	currentName: string;
};

export const DetailHeader = ({ currentName }: Props) => {
	const { pokemons } = usePokemonStore();
	const router = useRouter();
	const [query, setQuery] = useState("");
	const containerRef = useRef<HTMLDivElement>(null);

	useClickOutside(containerRef, () => setQuery(""));

	const suggestions = query.trim()
		? pokemons
				.filter((p) =>
					p.name.toLowerCase().includes(query.trim().toLowerCase()),
				)
				.slice(0, 8)
		: [];

	const goTo = (name: string) => {
		router.push(`/pokemon/${name}`);
		setQuery("");
	};

	return (
		<div className="flex flex-wrap items-center gap-3.5 rounded-t-2xl border-b border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 px-5 py-5 sm:flex-nowrap sm:px-8">
			<Link
				href="/"
				className="flex shrink-0 items-center gap-2.5 no-underline"
			>
				<PokeballLogo />
			</Link>
			<span className="hidden text-sm font-semibold text-gray-500 capitalize sm:inline">
				/ {currentName}
			</span>
			<div
				className="relative min-w-[120px] flex-1 sm:max-w-[280px]"
				ref={containerRef}
			>
				<input
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search Pokémon..."
					className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none focus:border-blue-600"
				/>
				{suggestions.length > 0 && (
					<div className="dropdown absolute top-[calc(100%+6px)] left-0 z-20 max-h-[280px] w-[260px] overflow-y-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.14)]">
						{suggestions.map((p) => (
							<div
								key={p.id}
								onClick={() => goTo(p.name)}
								className="cursor-pointer rounded-lg px-3.5 py-2.5 text-[13px] font-semibold text-gray-700 capitalize hover:bg-gray-100"
							>
								#{String(p.id).padStart(3, "0")} {p.name}
							</div>
						))}
					</div>
				)}
			</div>
			<Link
				href="/"
				className="ml-auto shrink-0 rounded-[10px] bg-gray-100 px-4 py-2.5 text-[13px] font-bold text-gray-700 no-underline hover:text-gray-700"
			>
				← Back to list
			</Link>
		</div>
	);
};
