import { BLOCKED_COMBOS } from '@/utils/keyboardShortcuts';
import { useEffect } from 'react';

const useIntegrityMeasures = (
    isTesting: any, 
    BLOCKED_KEYS: any, 
    setState: any, 
    toast: any, 
    devtoolsCheckRef: any,
    finalizeOrProceed: any,
    state: any
) => {

    // Integrity measures wiring
    useEffect(() => {
    if (!isTesting) return

    const onContextMenu = (e: MouseEvent) => e.preventDefault()
    const onCopyCutPaste = (e: ClipboardEvent) => e.preventDefault()
    const onKeydown = (e: KeyboardEvent) => {
      if (BLOCKED_KEYS.has(e.key) || BLOCKED_COMBOS(e)) {
        e.preventDefault()
        e.stopPropagation()
        violation("Blocked shortcut detected")
      }
    }
    const onVisibility = () => {
      if (document.hidden) {
        violation("Tab/window switching detected")
      }
    }
    const beforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ""
      return ""
    }

    const violation = (reason: string) => {
      setState((prev: any) => {
        const next = prev.violations + 1
        return { ...prev, violations: next }
      })
      toast({
        variant: "destructive",
        title: "Integrity warning",
        description: `${reason}. Further violations may auto-submit your test.`,
      })
    }

    // attach
    document.addEventListener("contextmenu", onContextMenu)
    document.addEventListener("copy", onCopyCutPaste)
    document.addEventListener("cut", onCopyCutPaste)
    document.addEventListener("paste", onCopyCutPaste)
    window.addEventListener("keydown", onKeydown, { capture: true })
    document.addEventListener("visibilitychange", onVisibility)
    window.addEventListener("beforeunload", beforeUnload)

    // simple devtools heuristic
    devtoolsCheckRef.current = window.setInterval(() => {
      // const w = window as any
      const threshold = 160 // px
      const widthDiff = Math.abs(window.outerWidth - window.innerWidth)
      const heightDiff = Math.abs(window.outerHeight - window.innerHeight)
      if (widthDiff > threshold || heightDiff > threshold) {
        setState((prev: any) => ({ ...prev, violations: prev.violations + 1 }))
        toast({
          variant: "destructive",
          title: "Integrity warning",
          description: "Developer tools usage detected.",
        })
      }
      // eslint-disable-next-line no-debugger
      const start = performance.now()
      debugger
      if (performance.now() - start > 100) {
        setState((prev: any) => ({ ...prev, violations: prev.violations + 1 }))
        toast({
          variant: "destructive",
          title: "Integrity warning",
          description: "Debugger detected.",
        })
      }
    }, 5000)

    return () => {
      document.removeEventListener("contextmenu", onContextMenu)
      document.removeEventListener("copy", onCopyCutPaste)
      document.removeEventListener("cut", onCopyCutPaste)
      document.removeEventListener("paste", onCopyCutPaste)
      window.removeEventListener("keydown", onKeydown, { capture: true } as any)
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("beforeunload", beforeUnload)
      if (devtoolsCheckRef.current) window.clearInterval(devtoolsCheckRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTesting])

  // Auto-submit if too many integrity strikes
  useEffect(() => {
    if (!isTesting) return
    if (state.violations >= 3) {
      toast({
        variant: "destructive",
        title: "Assessment auto-submitted",
        description: "Exceeded maximum integrity violations.",
      })
      finalizeOrProceed(false)
    }
  }, [state.violations, isTesting, finalizeOrProceed, toast])

    // Auto-submit on time expiration
    useEffect(() => {
      if (!isTesting) return
      if (state.remainingSeconds === 0) {
        finalizeOrProceed(true)
      }
    }, [isTesting, state.remainingSeconds, finalizeOrProceed]);
  
};

export default useIntegrityMeasures;