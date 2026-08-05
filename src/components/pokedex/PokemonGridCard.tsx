import Image from "next/image";
import {PokemonPreview} from "@/types/pokemon";
import {TypeChip} from "@/components/ui/TypeChip";
import {getTypeBorder, getTypeTint} from "@/constants/pokemonTypeColors";

type Props = {
    pokemon: PokemonPreview;
    onSelect: (id: number) => void;
};

export const PokemonGridCard = ({pokemon, onSelect}: Props) => {
    const mainType = pokemon.types[0].type.name;

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => onSelect(pokemon.id)}
            onKeyDown={(e) => {
                if (e.key === "Enter") onSelect(pokemon.id);
            }}
            className={`flex cursor-pointer flex-col gap-2.5 rounded-2xl border-r border-b border-l border-t-[3px] border-r-gray-200 border-b-gray-200 border-l-gray-200 p-4 transition-all duration-150 hover:-translate-y-[3px] hover:border-r-gray-300 hover:border-b-gray-300 hover:border-l-gray-300 hover:shadow-[0_10px_24px_rgba(0,0,0,0.1)] ${getTypeTint(mainType)} ${getTypeBorder(mainType)}`}
        >
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
                <Image
                    src={pokemon.sprites}
                    alt={pokemon.name}
                    fill
                    sizes="150px"
                    className="object-contain p-2"
                />
            </div>
            <div>
                <div className="text-xs font-semibold text-gray-500">
                    #{String(pokemon.id).padStart(3, "0")}
                </div>
                <div className="truncate text-[15px] font-bold text-gray-900 capitalize">
                    {pokemon.name}
                </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
                {pokemon.types.map((t) => (
                    <TypeChip key={t.type.name} type={t.type.name} size="sm" />
                ))}
            </div>
        </div>
    );
};
