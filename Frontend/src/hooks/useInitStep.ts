import { useCallback } from 'react';
import { generateMockQuestions } from '@/lib/generateMockQuestions';
import { Step } from "@/types/tests";

const useInitStep = (
  state: any, 
  setState: any, 
  setIntegrityNotice: React.Dispatch<React.SetStateAction<string | null>>
  ) => {

    // Start a step with mock questions immediately
    const initStep = useCallback(
        async (step: Step) => {
          const questions = generateMockQuestions(step)
          const minutesPerQuestion = state.minutesPerQuestion || 1
          const totalSeconds = questions.length * minutesPerQuestion * 60
    
          setState((prev: any) => ({
            ...prev,
            started: true,
            step,
            questions,
            answers: Array(questions.length).fill(-1),
            currentIndex: 0,
            totalSeconds,
            remainingSeconds: totalSeconds,
          }))
    
          // Enter fullscreen for integrity if possible
          try {
            const el = document.documentElement
            if (!document.fullscreenElement && el.requestFullscreen) {
              await el.requestFullscreen()
            }
          } catch {
            // ignore
          }
          setIntegrityNotice("Integrity mode enabled: fullscreen, clipboard blocked, and tab switching monitored.")
        },
        [state.minutesPerQuestion],
      )
    
    return { initStep };
};

export default useInitStep;