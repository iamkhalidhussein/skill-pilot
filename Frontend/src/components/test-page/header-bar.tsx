import { Progress } from "../ui"
import { IntegrityBadge } from "../ui/integrity-badge"
import { TimerBadge } from "../ui/timer-badge"

interface Props {
    step: number
    currentIndex: number
    questionsLength: number
    remainingSeconds: number
    totalSeconds: number
    integrityStrikesLeft: number
    progressPercent: number
};

export const HeaderBar = ({ step, currentIndex, questionsLength, remainingSeconds, totalSeconds, integrityStrikesLeft, progressPercent }: Props) => {
    return (
        <div className="border-b bg-background">
            <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
                <div>
                    <div className="text-sm text-muted-foreground">Step {step} Assessment</div>
                    <div className="text-base font-medium">
                        Question {currentIndex + 1} of {questionsLength}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <TimerBadge remainingSeconds={remainingSeconds} totalSeconds={totalSeconds} />
                    <IntegrityBadge strikesLeft={integrityStrikesLeft} />
                </div>
            </div>
            <div className="border-t">
                <div className="max-w-6xl mx-auto p-3">
                    <Progress value={progressPercent} />
                </div>
            </div>
        </div>
    )
};