import Image from "next/image";
import Link from "next/link";
import { PokemonPreview } from "@/types/pokemon";
import { TypeChip } from "@/components/ui/TypeChip";
import { StatBar } from "@/components/ui/StatBar";
import { getTypeTint } from "@/constants/pokemonTypeColors";

const QUICK_STATS: { name: string; label: string }[] = [
	{ name: "hp", label: "HP" },
	{ name: "attack", label: "ATK" },
	{ name: "defense", label: "DEF" },
	{ name: "speed", label: "VEL" },
];

type Props = {
	pokemon: PokemonPreview | null;
	onClose: () => void;
};

export const QuickViewDrawer = ({ pokemon, onClose }: Props) => {
	const open = pokemon !== null;
	const mainType = pokemon?.types[0].type.name ?? "normal";

	return (
		<>
			<div
				onClick={onClose}
				className="fixed inset-0 z-30 transition-[background] duration-200"
				style={{
					background: `rgba(17, 24, 39, ${open ? 0.28 : 0})`,
					pointerEvents: open ? "auto" : "none",
				}}
			/>
			<div
				className="fixed top-0 right-0 bottom-0 z-40 flex w-[380px] max-w-[90vw] flex-col overflow-y-auto bg-white shadow-[-8px_0_30px_rgba(0,0,0,0.1)] transition-transform duration-[280ms] ease-out"
				style={{ transform: `translateX(${open ? "0" : "100%"})` }}
			>
				{pokemon && (
					<div className="flex flex-col gap-5 p-7">
						<div className="flex items-center justify-between">
							<span className="text-[13px] font-bold text-gray-500">
								#{String(pokemon.id).padStart(3, "0")}
							</span>
							<button
								type="button"
								onClick={onClose}
								aria-label="Close quick view"
								className="cursor-pointer p-1 text-xl leading-none text-gray-500"
							>
								×
							</button>
						</div>
						<div
							className={`relative aspect-square w-full overflow-hidden rounded-2xl ${getTypeTint(mainType)}`}
						>
							<Image
								src={pokemon.sprites}
								alt={pokemon.name}
								fill
								sizes="380px"
								className="object-contain p-4"
							/>
						</div>
						<div className="text-[26px] font-extrabold text-gray-900 capitalize">
							{pokemon.name}
						</div>
						<div className="flex gap-1.5">
							{pokemon.types.map((t) => (
								<TypeChip key={t.type.name} type={t.type.name} />
							))}
						</div>
						{pokemon.description && (
							<p className="text-sm leading-relaxed text-gray-600">
								{pokemon.description}
							</p>
						)}
						<Link
							href={`/pokemon/${pokemon.name}`}
							className="rounded-xl bg-blue-600 px-4 py-2.5 text-center text-sm font-bold text-white! no-underline hover:text-white!"
						>
							View full profile →
						</Link>
						{pokemon.stats && (
							<div className="mt-2 flex flex-col gap-2.5">
								{QUICK_STATS.map(({ name, label }) => {
									const stat = pokemon.stats?.find((s) => s.stat.name === name);
									if (!stat) return null;
									return (
										<StatBar
											key={name}
											label={label}
											value={stat.base_stat}
											type={mainType}
											size="sm"
										/>
									);
								})}
							</div>
						)}
					</div>
				)}
			</div>
		</>
	);
};
