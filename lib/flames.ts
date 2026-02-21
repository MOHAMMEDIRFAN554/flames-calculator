export type FlamesResult = {
    letter: "F" | "L" | "A" | "M" | "E" | "S";
    meaning: string;
    totalRemaining: number;
};

const meaningMap: Record<string, string> = {
    F: "Friends",
    L: "Love",
    A: "Attraction",
    M: "Marriage",
    E: "Enemy",
    S: "Sister",
};

export function calculateFlames(name1: string, name2: string): FlamesResult {
    if (!name1 || !name2) {
        throw new Error("Both names are required");
    }

    // 1. Normalize input: Aggressively remove all non-alpha and uppercase
    const clean = (str: string) =>
        str.replace(/[^a-zA-Z]/g, "").toUpperCase();

    const n1 = clean(name1);
    const n2 = clean(name2);

    if (!n1 || !n2) {
        throw new Error("Names must contain alphabetic characters");
    }

    // 2. Convert to arrays
    const arr1 = n1.split("");
    const arr2 = n2.split("");

    // 3. Remove common letters (frequency-based approach)
    const freq: Record<string, number> = {};

    for (const ch of arr2) {
        freq[ch] = (freq[ch] || 0) + 1;
    }

    let remaining1 = 0;

    for (const ch of arr1) {
        if (freq[ch] && freq[ch] > 0) {
            freq[ch]--;
        } else {
            remaining1++;
        }
    }

    const remaining2 = Object.values(freq).reduce(
        (sum, count) => sum + count,
        0
    );

    const totalRemaining = remaining1 + remaining2;

    // Edge case: if totalRemaining is 0, default to Sister or S
    if (totalRemaining === 0) {
        return {
            letter: "S",
            meaning: meaningMap["S"],
            totalRemaining: 0,
        };
    }

    // 4. FLAMES elimination logic (Circular)
    let flames = ["F", "L", "A", "M", "E", "S"];
    let index = 0;

    while (flames.length > 1) {
        // Current index + count - 1 (because index is 0-based)
        index = (index + totalRemaining - 1) % flames.length;
        flames.splice(index, 1);
    }

    const finalLetter = flames[0] as FlamesResult["letter"];

    return {
        letter: finalLetter,
        meaning: meaningMap[finalLetter],
        totalRemaining: totalRemaining,
    };
}
