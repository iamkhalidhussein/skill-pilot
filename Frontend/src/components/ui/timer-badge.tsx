import { Clock } from "lucide-react";
import { cn } from ".";
import { mmss } from "@/constants/integrity";

export const TimerBadge = ({ remainingSeconds, totalSeconds }: { remainingSeconds: number; totalSeconds: number }) => {
    const pct = totalSeconds > 0 ? (remainingSeconds / totalSeconds) * 100 : 0
    const color = pct > 50 ? "text-emerald-700" : pct > 20 ? "text-amber-700" : "text-red-700"
  
    return (
      <div className="flex items-center gap-2 rounded-md border px-3 py-1.5 bg-background">
        <Clock className={cn("h-4 w-4", color)} />
        <span className={cn("font-mono text-sm", color)}>{mmss(remainingSeconds)}</span>
      </div>
    )
};