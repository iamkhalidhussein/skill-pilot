import { useEffect } from "react"

const useCountdownTimer = (
    isTesting: any, 
    timerRef: any, 
    setState: any
) => {
    
    // Countdown timer management
    useEffect(() => {
        if (!isTesting) return
        if (timerRef.current) window.clearInterval(timerRef.current)
        timerRef.current = window.setInterval(() => {
          setState((prev: any) => {
            if (prev.remainingSeconds <= 1) {
              window.clearInterval(timerRef.current!)
              return { ...prev, remainingSeconds: 0 }
            }
            return { ...prev, remainingSeconds: prev.remainingSeconds - 1 }
          })
        }, 1000)
        return () => {
          if (timerRef.current) window.clearInterval(timerRef.current)
        }
      }, [isTesting])
};

export default useCountdownTimer;
