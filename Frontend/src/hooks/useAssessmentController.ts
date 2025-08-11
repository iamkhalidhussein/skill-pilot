import { LS_KEYS } from "@/constants/integrity";
import { useMemo } from "react";

const useAssessmentUIHelpers = (state: any) => {
    // Lock check from Step 1 hard fail
    const step1Locked = typeof window !== "undefined" && localStorage.getItem(LS_KEYS.STEP1_FAIL_LOCK) === "1"

    // Derived UI helpers
    const progressPercent = useMemo(() => {
        if (!state.questions.length) return 0
        return ((state.currentIndex + 1) / state.questions.length) * 100
    }, [state.currentIndex, state.questions.length])

    const answeredCount = useMemo(() => state.answers.filter((a: any) => a !== -1).length, [state.answers])

    const integrityStrikesLeft = Math.max(0, 3 - state.violations)

    return { step1Locked, progressPercent, answeredCount, integrityStrikesLeft };
};

export default useAssessmentUIHelpers;