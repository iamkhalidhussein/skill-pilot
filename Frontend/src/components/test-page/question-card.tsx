import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, ChevronLeft, ChevronRight, Flag, cn } from "../ui"

interface Question {
    id: string | number
    competency: string
    level: string
    text: string
    options: string[]
    correctIndex?: number
};

interface QuestionCardProps {
    question: Question
    currentIndex: number
    totalQuestions: number
    selectedAnswer: number
    handleAnswer: (idx: number) => void
    goPrev: () => void
    goNext: () => void
    setShowSubmit: React.Dispatch<React.SetStateAction<boolean>>
};

export const QuestionCard = ({
    question,
    currentIndex,
    totalQuestions,
    selectedAnswer,
    handleAnswer,
    goPrev,
    goNext,
    setShowSubmit
}: QuestionCardProps) => {
    
    const isLast = currentIndex === totalQuestions - 1;

    return (
        <Card>
        <CardHeader>
            <CardDescription className="text-xs uppercase tracking-wide">
            {question.competency} • {question.level}
            </CardDescription>
            <CardTitle className="text-lg">{question.text}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
            {question.options.map((opt, idx) => {
            const selected = selectedAnswer === idx
            return (
                <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={cn(
                    "w-full text-left rounded-lg border p-4 transition-colors",
                    selected ? "border-emerald-600 bg-emerald-50" : "border-border hover:bg-muted",
                )}
                >
                <div className="flex items-center gap-3">
                    <div
                    className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center",
                        selected ? "border-emerald-600 bg-emerald-600" : "border-muted-foreground/30",
                    )}
                    >
                    {selected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span>{opt}</span>
                </div>
                </button>
            )
            })}
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-3">
            <Button variant="outline" onClick={goPrev} disabled={currentIndex === 0}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
            </Button>
            <div className="flex items-center gap-2">
            {!isLast ? (
                <Button onClick={goNext}>
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            ) : (
                <Button onClick={() => setShowSubmit(true)}>
                <Flag className="w-4 h-4 mr-1" />
                Finish Test
                </Button>
            )}
            </div>
        </CardFooter>
    </Card>
    )
};