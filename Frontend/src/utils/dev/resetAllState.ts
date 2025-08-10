// Reset for demo/testing (dev-only control)

// type AppState = {
//     started: boolean
//     step: number
//     questions: any[]
//     answers: any[]
//     currentIndex: number
//     minutesPerQuestion: number
//     totalSeconds: number
//     remainingSeconds: number
//     violations: number
//     results: any[]
//     highestLevel: string | null
//     completed: boolean
// };

export const resetAll = (
    LS_KEYS: { STEP1_FAIL_LOCK: string; LAST_HIGHEST: string },
    setState: any,
    setIntegrityNotice: React.Dispatch<React.SetStateAction<string | null>>
) => {
    console.log(LS_KEYS);
    console.log(setState);
    console.log(setIntegrityNotice);
    try {
      localStorage.removeItem(LS_KEYS.STEP1_FAIL_LOCK)
    } catch {}
    setState({
      started: false,
      step: 1,
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
    setIntegrityNotice(null)
}