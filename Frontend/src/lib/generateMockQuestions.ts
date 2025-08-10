import { Step, Question, Level } from "@/types/tests";
import COMPETENCIES from "@/lib/mock/competencies.json";

// Mapping per step
const STEP_LEVELS: Record<Step, [Level, Level]> = {
    1: ["A1", "A2"],
    2: ["B1", "B2"],
    3: ["C1", "C2"],
};


export function generateMockQuestions(step: Step): Question[] {
    const [l1, l2] = STEP_LEVELS[step]
    const makeQ = (competency: string, level: Level, i: number): Question => {
      const base = `${competency} (${level})`
      // simple deterministic options
      const options = [
        `Best ${competency.toLowerCase()} practice`,
        `Common ${competency.toLowerCase()} pitfall`,
        `Example of ${competency.toLowerCase()}`,
        `Irrelevant choice`,
      ]
      const correctIndex = i % 4 // vary across competencies
      return {
        id: `${level}-${i}`,
        text: `Q${i + 1}: ${base} — choose the most appropriate answer.`,
        competency,
        level,
        options,
        correctIndex,
      }
    }
  
    const qs1: Question[] = COMPETENCIES.map((c, i) => makeQ(c, l1, i))
    const qs2: Question[] = COMPETENCIES.map((c, i) => makeQ(c, l2, i + COMPETENCIES.length))
    // Interleave to distribute levels
    const combined: Question[] = []
    for (let i = 0; i < COMPETENCIES.length; i++) {
      combined.push(qs1[i], qs2[i])
    }
    return combined // 44 total
}