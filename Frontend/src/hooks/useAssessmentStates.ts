import { useRef, useState } from "react";
import { useToast } from "./use-toast";
import { Step, TestState } from "@/types/tests";

const useAssessmentStates = () => {
    const { toast } = useToast()
    const [showSubmit, setShowSubmit] = useState(false)
    const [showProceed, setShowProceed] = useState<{ open: boolean; nextStep: Step | null }>({
        open: false,
        nextStep: null,
    })
    const [integrityNotice, setIntegrityNotice] = useState<string | null>(null)

    const [state, setState] = useState<TestState>({
        step: 1,
        started: false,
        questions: [],
        answers: [],
        currentIndex: 0,
        minutesPerQuestion: 1,
        totalSeconds: 0,
        remainingSeconds: 0,
        violations: 0,
        results: [],
        highestLevel: null,
        completed: false,
    })

    const timerRef = useRef<number | null>(null)
    const devtoolsCheckRef = useRef<number | null>(null)
    const isTesting = state.started && !state.completed

    return { toast, showSubmit, setShowSubmit, showProceed, setShowProceed, integrityNotice, setIntegrityNotice, setState, timerRef, devtoolsCheckRef, isTesting, state };
};

export default useAssessmentStates;