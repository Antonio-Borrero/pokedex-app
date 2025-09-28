import {useRef, useEffect} from "react";

export const useInfiniteScroll = (callback: () => void) => {
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!sentinelRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) callback();
        });
        observer.observe(sentinelRef.current);
        return () => {observer.disconnect()}
    }, [callback])
    return sentinelRef
}