import { ShieldCheck } from "lucide-react";

export const IntegrityBadge = ({ strikesLeft = 3 }: { strikesLeft: number }) => {
    return (
        <div className="flex items-center gap-2 rounded-md border px-3 py-1.5 bg-background">
            <ShieldCheck className="h-4 w-4 text-emerald-700" />
            <span className="text-sm">{strikesLeft} strikes left</span>
        </div>
    )
};