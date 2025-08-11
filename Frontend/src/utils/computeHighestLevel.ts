import { Level, Step } from "@/types/tests"

// Compute highest level given prior and current certified result with “remain” logic
export function computeHighest(prev: Level | null, step: Step, outcome: { certifiedLevel: Level | null }): Level | null {
    const order: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"]
    const rank = (l: Level | null) => (l ? order.indexOf(l) : -1)
    if (step === 1 && outcome.certifiedLevel === null) {
      // fail at step 1 => no level
        return prev
    }
    // For “remain” rules we pass null to indicate remain at previous best
    const candidate = outcome.certifiedLevel ?? prev
    return rank(candidate) > rank(prev) ? candidate : prev
};