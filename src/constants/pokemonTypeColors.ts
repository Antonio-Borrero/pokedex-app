// Official Pokémon type colors. Each type exposes ready-made Tailwind
// arbitrary-value class strings (not built at runtime) so Tailwind's
// static scanner can pick them up: tint = pale card background,
// tintStrong = detail/quick-view hero background, solid = chip/bar/
// border-accent background, border = top-border accent for grid cards.
type TypeClasses = {
    tint: string;
    tintStrong: string;
    solid: string;
    border: string;
};

const TYPE_CLASSES: Record<string, TypeClasses> = {
    normal: {tint: "bg-[#A8A878]/10", tintStrong: "bg-[#A8A878]/20", solid: "bg-[#A8A878]", border: "border-t-[#A8A878]"},
    fire: {tint: "bg-[#F08030]/10", tintStrong: "bg-[#F08030]/20", solid: "bg-[#F08030]", border: "border-t-[#F08030]"},
    fighting: {tint: "bg-[#C03028]/10", tintStrong: "bg-[#C03028]/20", solid: "bg-[#C03028]", border: "border-t-[#C03028]"},
    water: {tint: "bg-[#6890F0]/10", tintStrong: "bg-[#6890F0]/20", solid: "bg-[#6890F0]", border: "border-t-[#6890F0]"},
    flying: {tint: "bg-[#A890F0]/10", tintStrong: "bg-[#A890F0]/20", solid: "bg-[#A890F0]", border: "border-t-[#A890F0]"},
    grass: {tint: "bg-[#78C850]/10", tintStrong: "bg-[#78C850]/20", solid: "bg-[#78C850]", border: "border-t-[#78C850]"},
    poison: {tint: "bg-[#A040A0]/10", tintStrong: "bg-[#A040A0]/20", solid: "bg-[#A040A0]", border: "border-t-[#A040A0]"},
    electric: {tint: "bg-[#F8D030]/10", tintStrong: "bg-[#F8D030]/20", solid: "bg-[#F8D030]", border: "border-t-[#F8D030]"},
    ground: {tint: "bg-[#E0C068]/10", tintStrong: "bg-[#E0C068]/20", solid: "bg-[#E0C068]", border: "border-t-[#E0C068]"},
    psychic: {tint: "bg-[#F85888]/10", tintStrong: "bg-[#F85888]/20", solid: "bg-[#F85888]", border: "border-t-[#F85888]"},
    rock: {tint: "bg-[#B8A038]/10", tintStrong: "bg-[#B8A038]/20", solid: "bg-[#B8A038]", border: "border-t-[#B8A038]"},
    ice: {tint: "bg-[#98D8D8]/10", tintStrong: "bg-[#98D8D8]/20", solid: "bg-[#98D8D8]", border: "border-t-[#98D8D8]"},
    bug: {tint: "bg-[#A8B820]/10", tintStrong: "bg-[#A8B820]/20", solid: "bg-[#A8B820]", border: "border-t-[#A8B820]"},
    dragon: {tint: "bg-[#7038F8]/10", tintStrong: "bg-[#7038F8]/20", solid: "bg-[#7038F8]", border: "border-t-[#7038F8]"},
    ghost: {tint: "bg-[#705898]/10", tintStrong: "bg-[#705898]/20", solid: "bg-[#705898]", border: "border-t-[#705898]"},
    dark: {tint: "bg-[#705848]/10", tintStrong: "bg-[#705848]/20", solid: "bg-[#705848]", border: "border-t-[#705848]"},
    steel: {tint: "bg-[#B8B8D0]/10", tintStrong: "bg-[#B8B8D0]/20", solid: "bg-[#B8B8D0]", border: "border-t-[#B8B8D0]"},
    fairy: {tint: "bg-[#EE99AC]/10", tintStrong: "bg-[#EE99AC]/20", solid: "bg-[#EE99AC]", border: "border-t-[#EE99AC]"},
};

const DEFAULT_CLASSES = TYPE_CLASSES.normal;

const getTypeClasses = (type: string): TypeClasses => TYPE_CLASSES[type] ?? DEFAULT_CLASSES;

// Pale tint used for grid card backgrounds
export const getTypeTint = (type: string): string => getTypeClasses(type).tint;

// Slightly stronger tint used for detail/quick-view hero backgrounds
export const getTypeDetailTint = (type: string): string => getTypeClasses(type).tintStrong;

// Solid color used for type chips and stat bar fills
export const getTypeSolid = (type: string): string => getTypeClasses(type).solid;

// Top-border accent used on grid cards
export const getTypeBorder = (type: string): string => getTypeClasses(type).border;

export const formatTypeName = (type: string): string =>
    type.charAt(0).toUpperCase() + type.slice(1);
