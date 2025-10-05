import { useEffect } from "react"
import { usePokemonStore } from "@/store/pokemonStore"

export const useScrollRestore = () => {
    const { scrollY, setScrollY } = usePokemonStore()

    useEffect(() => {
        const handleBeforeUnload = () => setScrollY(window.scrollY)
        window.addEventListener("beforeunload", handleBeforeUnload)
        return () => window.removeEventListener("beforeunload", handleBeforeUnload)
    }, [setScrollY])

    useEffect(() => {
        if (scrollY > 0) {
            window.scrollTo({ top: scrollY, behavior: "instant" })
        }
    }, [scrollY])
}
