import {RefObject, useEffect} from "react";

export default function useClickOutside(ref: RefObject<HTMLElement | null>, onClickOutside: () => void) {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClickOutside();
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [ref, onClickOutside]);
}