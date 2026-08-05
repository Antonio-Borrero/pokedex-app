import Image from "next/image";
import {ChevronRight} from "lucide-react";
import {PokemonPreview} from "@/types/pokemon";
import {TypeChip} from "@/components/ui/TypeChip";

type Props = {
    pokemon: PokemonPreview;
    onSelect: (id: number) => void;
};

export const PokemonListRow = ({pokemon, onSelect}: Props) => (
    <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect(pokemon.id)}
        onKeyDown={(e) => {
            if (e.key === "Enter") onSelect(pokemon.id);
        }}
        className="flex cursor-pointer items-center gap-4 rounded-2xl px-3 py-3.5 transition-colors hover:bg-gray-50"
    >
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100">
            <Image src={pokemon.sprites} alt={pokemon.name} fill sizes="56px" className="object-contain p-1" />
        </div>
        <div className="w-9 shrink-0 text-xs font-bold text-gray-500">
            #{String(pokemon.id).padStart(3, "0")}
        </div>
        <div className="flex-1 truncate text-base font-bold text-gray-900 capitalize">
            {pokemon.name}
        </div>
        <div className="hidden gap-1.5 sm:flex">
            {pokemon.types.map((t) => (
                <TypeChip key={t.type.name} type={t.type.name} size="sm" />
            ))}
        </div>
        <ChevronRight size={18} className="ml-1 shrink-0 text-gray-400" />
    </div>
);
