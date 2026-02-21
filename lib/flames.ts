export type FlamesResult = {
    letter: "F" | "L" | "A" | "M" | "E" | "S";
    meaning: string;
    totalRemaining: number;
    name1Normalized: string;
    name2Normalized: string;
    commonLetters: string[];
    breakdown: string[];
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

    // 1. Normalize input
    const clean = (str: string) => str.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const n1 = clean(name1);
    const n2 = clean(name2);

    if (!n1 || !n2) {
        throw new Error("Names must contain alphabetic characters");
    }

    const arr1 = n1.split("");
    const arr2 = n2.split("");

    // 3. Remove common letters
    const freq1: Record<string, number> = {};
    const freq2: Record<string, number> = {};

    for (const ch of arr1) freq1[ch] = (freq1[ch] || 0) + 1;
    for (const ch of arr2) freq2[ch] = (freq2[ch] || 0) + 1;

    const common: string[] = [];
    const allChars = new Set([...Object.keys(freq1), ...Object.keys(freq2)]);

    allChars.forEach(ch => {
        const count = Math.min(freq1[ch] || 0, freq2[ch] || 0);
        for (let i = 0; i < count; i++) common.push(ch);
    });

    let remaining1 = "";
    let rem1Count = 0;
    const tempFreq2 = { ...freq2 };
    for (const ch of arr1) {
        if (tempFreq2[ch] && tempFreq2[ch] > 0) {
            tempFreq2[ch]--;
        } else {
            remaining1 += ch;
            rem1Count++;
        }
    }

    const tempFreq1 = { ...freq1 };
    let remaining2 = "";
    let rem2Count = 0;
    for (const ch of arr2) {
        if (tempFreq1[ch] && tempFreq1[ch] > 0) {
            tempFreq1[ch]--;
        } else {
            remaining2 += ch;
            rem2Count++;
        }
    }

    const totalRemaining = rem1Count + rem2Count;

    // 4. Elimination Process Tracking
    const eliminationSteps: string[] = [];
    let flames = ["F", "L", "A", "M", "E", "S"];

    if (totalRemaining > 0) {
        let tempFlames = [...flames];
        let index = 0;
        while (tempFlames.length > 1) {
            index = (index + totalRemaining - 1) % tempFlames.length;
            const removed = tempFlames.splice(index, 1);
            eliminationSteps.push(`Eliminated ${removed[0]} (Current order: ${tempFlames.join(', ')})`);
        }
        flames = tempFlames;
    } else {
        flames = ["S"];
    }

    const finalLetter = flames[0] as FlamesResult["letter"];

    return {
        letter: finalLetter,
        meaning: meaningMap[finalLetter],
        totalRemaining,
        name1Normalized: n1,
        name2Normalized: n2,
        commonLetters: common,
        breakdown: eliminationSteps,
    };
}
