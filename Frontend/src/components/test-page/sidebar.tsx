import { mmss } from "@/constants/integrity"
import { Alert, AlertDescription, AlertTitle, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Separator, ShieldCheck, cn } from "../ui"

interface SidebarProps {
    questions: any[]
    answers: number[]
    currentIndex: number
    setCurrentIndex: any
    remainingSeconds: number
    answeredCount: number
    setShowSubmit: React.Dispatch<React.SetStateAction<boolean>>
    integrityNotice: string | null
};


export const Sidebar = ({
    questions,
    answers,
    currentIndex,
    setCurrentIndex,
    remainingSeconds,
    answeredCount,
    setShowSubmit,
    integrityNotice
}: SidebarProps) => {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-base">Test Progress</CardTitle>
                <CardDescription>
                Answered {answeredCount}/{questions.length}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div>
                <div className="text-xs text-muted-foreground mb-1">Answered</div>
                <progress max={questions.length} value={answeredCount} className="w-full" />
                </div>
                <div className="rounded-md border p-3">
                <div className="text-xs text-muted-foreground mb-1">Time Remaining</div>
                <div className="font-mono">{mmss(remainingSeconds)}</div>
                </div>
                <Button variant="secondary" onClick={() => setShowSubmit(true)}>
                Submit Test
                </Button>
                <Separator />
                <div>
                <div className="text-sm font-medium mb-2">Questions</div>
                <div className="grid grid-cols-6 gap-2">
                    {questions.map((q, i) => {
                    const isCurrent = i === currentIndex
                    const answered = answers[i] !== -1
                    return (
                        <button
                        key={q.id}
                        onClick={() => setCurrentIndex(i)}
                        className={cn(
                            "h-8 w-8 text-xs rounded-md border",
                            isCurrent
                            ? "bg-emerald-600 text-white"
                            : answered
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "bg-background hover:bg-muted",
                        )}
                        >
                        {i + 1}
                        </button>
                    )
                    })}
                </div>
                </div>
                {integrityNotice && (
                <Alert>
                    <ShieldCheck className="h-4 w-4" />
                    <AlertTitle>Secure mode</AlertTitle>
                    <AlertDescription className="text-xs">{integrityNotice}</AlertDescription>
                </Alert>
                )}
            </CardContent>
        </Card>
    )
};