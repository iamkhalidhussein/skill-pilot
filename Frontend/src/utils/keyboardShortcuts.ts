export const BLOCKED_COMBOS = (e: KeyboardEvent) => {
    const k = e.key.toLowerCase()
    // Block Ctrl/Cmd + common actions
    if ((e.ctrlKey || e.metaKey) && ["c", "x", "v", "p", "s", "r", "u"].includes(k)) return true
    // Block Ctrl/Cmd + Shift + I/J/C/K
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "j", "c", "k"].includes(k)) return true
    return false
};