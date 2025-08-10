import { useCallback } from "react";

const useComputeScore = (state: any) => {

    const computeScore = useCallback(() => {
        const correct = state.answers.reduce((acc: any, ans: any, i: any) => {
          if (ans === state.questions[i].correctIndex) return acc + 1
          return acc
        }, 0)
        const total = state.questions.length
        const percent = total > 0 ? (correct / total) * 100 : 0
        return { correct, total, percent }
      }, [state.answers, state.questions])
    
    return { computeScore };
};

export default useComputeScore;