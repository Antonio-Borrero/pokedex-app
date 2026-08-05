import {getTypeSolid, formatTypeName} from "@/constants/pokemonTypeColors";

type Props = {
    type: string;
    size?: "sm" | "md";
};

export const TypeChip = ({type, size = "md"}: Props) => {
    const sizeClasses = size === "sm"
        ? "text-[11px] px-2.5 py-1 rounded-[7px]"
        : "text-xs px-3 py-1.5 rounded-lg";

    return (
        <span
            className={`font-extrabold text-white whitespace-nowrap ${sizeClasses} ${getTypeSolid(type)}`}
        >
            {formatTypeName(type)}
        </span>
    );
};
