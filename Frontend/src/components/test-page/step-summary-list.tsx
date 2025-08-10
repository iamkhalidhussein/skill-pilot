import { AlertTriangle, BadgeCheck } from "lucide-react";

type StepSummary = {
    step: number
    percent: number
    correct: number
    total: number
    certifiedLevel: string | null
};

interface Props {
    stepSummary: StepSummary[]
};

export const StepSummaryList = ({ stepSummary }: Props) => {
    return (
        <section className="grid gap-4 md:grid-cols-3">
            {stepSummary.map((r : any) => (
                <div key={r.step} className="rounded-lg border p-4 bg-card">
                <div className="text-sm text-muted-foreground">Step {r.step}</div>
                <div className="text-2xl font-semibold">{r.percent.toFixed(2)}%</div>
                <div className="text-xs text-muted-foreground">
                    Score: {r.correct}/{r.total}
                </div>
                <div className="mt-2">
                    {r.certifiedLevel ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 text-emerald-800 px-2 py-1 text-xs">
                        <BadgeCheck className="h-3 w-3" /> {r.certifiedLevel} certified
                    </span>
                    ) : (
                    <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs">
                        <AlertTriangle className="h-3 w-3" /> No new certification
                    </span>
                    )}
                </div>
                </div>
            ))}
        </section>
    )
};