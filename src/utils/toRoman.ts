const ROMAN_NUMERALS: [number, string][] = [
    [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

export const toRoman = (num: number): string => {
    let result = "";
    let remaining = num;
    for (const [value, symbol] of ROMAN_NUMERALS) {
        while (remaining >= value) {
            result += symbol;
            remaining -= value;
        }
    }
    return result;
};
