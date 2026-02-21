import { calculateFlames } from "./lib/flames.ts";

try {
    const result = calculateFlames("ATHULYA AR", "SHIVA PRAKASH");
    console.log("Names: ATHULYA AR & SHIVA PRAKASH");
    console.log("Remaining Count:", result.remainingCount);
    console.log("Result Letter:", result.letter);
    console.log("Result Meaning:", result.meaning);

    if (result.letter === "M" && result.remainingCount === 11) {
        console.log("✅ Logic validation passed!");
    } else {
        console.log("❌ Logic validation failed.");
    }
} catch (error) {
    console.error("Error during calculation:", error);
}
