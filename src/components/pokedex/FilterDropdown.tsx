"use client"

import {useRef, useState} from "react";
import useClickOutside from "@/hooks/useClickOutside";

export type FilterOption = {
    id: string;
    label: string;
    disabled?: boolean;
};

type Props = {
    label: string;
    options: FilterOption[];
    activeId: string;
    onSelect: (id: string) => void;
    variant?: "brand" | "neutral";
};

export const FilterDropdown = ({label, options, activeId, onSelect, variant = "neutral"}: Props) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => setOpen(false));

    const triggerClasses = variant === "brand"
        ? "bg-blue-600/10 text-blue-700"
        : "bg-gray-100 text-gray-700";

    return (
        <div className="relative shrink-0" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={`cursor-pointer rounded-[10px] px-3.5 py-2.5 text-[13px] font-bold whitespace-nowrap select-none ${triggerClasses}`}
            >
                {label} ▾
            </button>
            {open && (
                <div className="dropdown absolute top-[calc(100%+6px)] right-0 z-20 flex max-h-[280px] min-w-[160px] flex-col gap-0.5 overflow-y-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.14)]">
                    {options.map((option) => {
                        const active = option.id === activeId;
                        return (
                            <div
                                key={option.id}
                                onClick={() => {
                                    if (option.disabled) return;
                                    onSelect(option.id);
                                    setOpen(false);
                                }}
                                className={`rounded-lg px-4 py-2.5 text-[13px] whitespace-nowrap ${
                                    option.disabled
                                        ? "cursor-not-allowed text-gray-400"
                                        : active
                                            ? "cursor-pointer bg-blue-600/10 font-bold text-blue-700"
                                            : "cursor-pointer font-semibold text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                {option.label}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
