import {getTypeSolid} from "@/constants/pokemonTypeColors";

type Props = {
    label: string;
    value: number;
    type: string;
    size?: "sm" | "md";
};

export const StatBar = ({label, value, type, size = "md"}: Props) => {
    const isSmall = size === "sm";
    const width = `${Math.min(100, value)}%`;

    return (
        <div className="flex items-center gap-2.5">
            <span className={`shrink-0 font-bold text-gray-500 ${isSmall ? "w-9 text-xs" : "w-[120px] text-[13px] text-gray-600"}`}>
                {label}
            </span>
            <div className={`flex-1 rounded-full bg-gray-200 overflow-hidden ${isSmall ? "h-1.5" : "h-2"}`}>
                <div
                    className={`h-full rounded-full ${getTypeSolid(type)}`}
                    style={{width}}
                />
            </div>
            <span className={`shrink-0 text-right font-bold text-gray-700 ${isSmall ? "w-7 text-xs" : "w-8 text-[13px]"}`}>
                {value}
            </span>
        </div>
    );
};
