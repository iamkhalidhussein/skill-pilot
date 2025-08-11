import { Step, Level } from "@/types/tests";

// Evaluate certification outcome for each step
export function evaluateStep(
    step: Step,
    percent: number,
  ): { certifiedLevel: Level | null; proceed: boolean; lockOnFail: boolean } {
    // Step 1 → Levels A1 & A2
    if (step === 1) {
      if (percent < 25) return { certifiedLevel: null, proceed: false, lockOnFail: true }
      if (percent < 50) return { certifiedLevel: "A1", proceed: false, lockOnFail: false }
      if (percent < 75) return { certifiedLevel: "A2", proceed: false, lockOnFail: false }
      return { certifiedLevel: "A2", proceed: true, lockOnFail: false } // ≥75% proceed to Step 2
    }
  
    // Step 2 → Levels B1 & B2
    if (step === 2) {
      if (percent < 25) return { certifiedLevel: null, proceed: false, lockOnFail: false } // remain at A2
      if (percent < 50) return { certifiedLevel: "B1", proceed: false, lockOnFail: false }
      if (percent < 75) return { certifiedLevel: "B2", proceed: false, lockOnFail: false }
      return { certifiedLevel: "B2", proceed: true, lockOnFail: false } // ≥75% proceed to Step 3
    }
  
    // Step 3 → Levels C1 & C2
    if (percent < 25) return { certifiedLevel: null, proceed: false, lockOnFail: false } // remain at B2
    if (percent < 50) return { certifiedLevel: "C1", proceed: false, lockOnFail: false }
    return { certifiedLevel: "C2", proceed: false, lockOnFail: false } // ≥50%
}