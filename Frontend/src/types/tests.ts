export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2"
export type Step = 1 | 2 | 3

export type Question = {
    id: string
    text: string
    competency: string
    level: Level
    options: string[]
    correctIndex: number
}

export type StepResult = {
    step: Step
    total: number
    correct: number
    percent: number
    certifiedLevel: Level | null
    proceeded: boolean
}

export type TestState = {
    started: boolean
    step: Step
    questions: Question[]
    answers: number[] // -1 for unanswered
    currentIndex: number
    totalSeconds: number
    remainingSeconds: number
    minutesPerQuestion: number
    violations: number
    results: StepResult[]
    highestLevel: Level | null
    completed: boolean
}