// LocalStorage keys for simple persistence of integrity and retest rules
export const LS_KEYS = {
    STEP1_FAIL_LOCK: "test_lock_step1_fail", // "1" => locked
    LAST_HIGHEST: "test_last_highest_level", // keep last highest for display/analytics
};

// Helper: pad seconds mm:ss
export const mmss = (s: number) => {
    const m = Math.floor(s / 60)
    const r = s % 60
    return `${m}:${r.toString().padStart(2, "0")}`
};

// Integrity: blocked shortcuts list
export const BLOCKED_KEYS = new Set([
  "F12", // devtools
  "F11", // fullscreen toggle
]);