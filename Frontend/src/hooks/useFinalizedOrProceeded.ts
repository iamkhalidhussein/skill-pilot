import { Step, StepResult } from "@/types/tests";
import { useCallback } from "react";

const useFinalizedOrProceeded = (
    computeScore: any, 
    evaluateStep: any, 
    state: any, 
    computeHighest: any, 
    LS_KEYS: any, 
    setState: any, 
    setShowProceed: any, 
    toast: any
) => {
    
    const finalizeOrProceed = useCallback(
        (fromTimer = false) => {
          const { correct, total, percent } = computeScore()
          const outcome = evaluateStep(state.step, percent)
          // Update highest level with remain semantics
          const newHighest = computeHighest(state.highestLevel, state.step, outcome)
    
          // Persist last highest optionally
          try {
            if (newHighest) localStorage.setItem(LS_KEYS.LAST_HIGHEST, newHighest)
          } catch {}
    
          // Hard fail lock on Step 1
          if (state.step === 1 && outcome.lockOnFail) {
            try {
              localStorage.setItem(LS_KEYS.STEP1_FAIL_LOCK, "1")
            } catch {}
          }
    
          const stepResult: StepResult = {
            step: state.step,
            total,
            correct,
            percent,
            certifiedLevel: outcome.certifiedLevel,
            proceeded: outcome.proceed,
          }
    
          const results = [...state.results, stepResult]
    
          if (outcome.proceed && state.step < 3) {
            // proceed to next step
            const nextStep = (state.step + 1) as Step
            setState((prev: any) => ({
              ...prev,
              results,
              highestLevel: newHighest,
            }))
            setShowProceed({ open: true, nextStep })
            toast({
              title: `Step ${state.step} complete`,
              description: `Score: ${percent.toFixed(2)}%. Proceeding unlocks Step ${nextStep}.`,
            })
          } else {
            // finalize
            const finalHighest = (() => {
              if (state.step === 1 && outcome.lockOnFail) return null // explicit fail at Step 1 => no certification
              // For “remain” cases, keep previous highest (may be A2/B2)
              // If current step yielded a level, merge with previous
              return newHighest
            })()
    
            setState((prev: any) => ({
              ...prev,
              started: false,
              completed: true,
              results,
              highestLevel: finalHighest,
            }))
    
            if (fromTimer) {
              toast({
                title: "Time expired",
                description: "Your answers have been submitted automatically.",
              })
            } else {
              toast({
                title: "Assessment submitted",
                description: "Review your results and certificate below.",
              })
            }
          }
        },
        [computeScore, state.highestLevel, state.results, state.step, toast],
      )
      return { finalizeOrProceed };
};

export default useFinalizedOrProceeded;
