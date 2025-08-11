import { Button, Card, CardContent } from "@/components/ui";
import { 
  useAssessmentActions, 
  useAssessmentStates, 
  useAssessmentUIHelpers, 
  useComputeScore, 
  useCountdownTimer, 
  useInitStep, 
  useIntegrityMeasures, useFinalizedOrProceeded
} from "@/hooks";
import { computeHighest, resetAll } from "@/utils";
import { evaluateStep } from "@/lib/certificationsLogic"
import { BLOCKED_KEYS, LS_KEYS } from "@/constants/integrity";
import { 
  HeaderBar,
  AssessmentFlow, 
  AssessmentFooter, 
  AssessmentHeader,
  AssessmentInstructions,
  AssessmentResults, 
  AssessmentTimestamp, 
  AssessmentWarning, 
  ProceedDialog, 
  QuestionCard, 
  Sidebar, 
  SubmitDialog
} from "@/components/test-page";

export function TestPage() {
  const { 
    toast, 
    timerRef, 
    devtoolsCheckRef, 
    integrityNotice, 
    isTesting, 
    setIntegrityNotice, setShowProceed, setShowSubmit, setState, showProceed, showSubmit, state } = useAssessmentStates();

  const { answeredCount, integrityStrikesLeft, progressPercent, step1Locked } = useAssessmentUIHelpers(state);

  const { computeScore } = useComputeScore(state);
  const { initStep } = useInitStep(state, setState, setIntegrityNotice);
  const { finalizeOrProceed } = useFinalizedOrProceeded(computeScore, evaluateStep, state, computeHighest, LS_KEYS, setState, setShowProceed, toast);

  const { handleAnswer, handleStart, goNext, goPrev, handleProceedConfirm, handleSubmit } = useAssessmentActions(step1Locked, initStep, isTesting, setState, showProceed, setShowProceed, setShowSubmit, finalizeOrProceed);
  
  useCountdownTimer(isTesting, timerRef, setState);

  useIntegrityMeasures(isTesting, BLOCKED_KEYS, setState, state, devtoolsCheckRef, finalizeOrProceed, state);

  // Views
  if (!state.started && !state.completed) {
    return (
      <main className="min-h-screen bg-muted/30">
        <div className="max-w-5xl mx-auto p-6 ">
          <Card className="overflow-hidden border-gray-200">
            
            <AssessmentHeader/>

            <CardContent className="grid gap-6">
              <AssessmentInstructions/>
              <AssessmentFlow/>
              <AssessmentWarning/>
              <AssessmentTimestamp/>
            </CardContent>

            <AssessmentFooter 
              step1Locked={step1Locked} 
              handleStart={handleStart}
            />
          </Card>

          {/* Dev/testing aid */}
          <div className="mt-4 flex items-center justify-between">
            <div />
            <Button variant="ghost" size="sm" onClick={() => resetAll(LS_KEYS, setState, setIntegrityNotice)}>
              Reset (demo)
            </Button>
          </div>

        </div>
      </main>
    )
  }

  if (isTesting) {
    const currentQ = state.questions[state.currentIndex]
    // const isLast = state.currentIndex === state.questions.length - 1

    return (
      <main className="min-h-screen bg-muted/30">
        <HeaderBar 
          currentIndex={state.currentIndex} 
          integrityStrikesLeft={integrityStrikesLeft} 
          progressPercent={progressPercent} 
          questionsLength={state.questions.length} 
          remainingSeconds={state.remainingSeconds} 
          step={state.step} 
          totalSeconds={state.totalSeconds}
        />

        <div className="max-w-6xl mx-auto p-4 md:p-6 grid gap-6 lg:grid-cols-4">
          
          {/* Question card */}
          <div className="lg:col-span-3">
            <QuestionCard 
              currentIndex={state.currentIndex}
              goNext={goNext}
              goPrev={goPrev}
              handleAnswer={handleAnswer}
              question={currentQ}
              selectedAnswer={state.answers[state.currentIndex]}
              setShowSubmit={setShowSubmit}
              totalQuestions={state.questions.length}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar
              answers={state.answers}
              currentIndex={state.currentIndex}
              questions={state.questions}
              answeredCount={answeredCount}
              setCurrentIndex={(i: any) => setState((prev) => ({ ...prev, currentIndex: i }))}
              integrityNotice={integrityNotice}
              setShowSubmit={setShowSubmit}
              remainingSeconds={state.remainingSeconds}
            />
          </div>
        </div>

        {/* Submit confirmation */}
        <SubmitDialog
          handleSubmit={handleSubmit}
          setShowSubmit={setShowSubmit}
          showSubmit={showSubmit}
          unansweredCount={state.questions.length - answeredCount}
        />

        {/* Proceed dialog */}
        <ProceedDialog
          handleProceedConfirm={handleProceedConfirm}
          setShowProceed={setShowProceed}
          showProceed={showProceed}
        />
      </main>
    )
  }

  // Completed view
  const finalHighest = state.highestLevel
  const stepSummary = state.results

  // Determine “remain” messaging
  const remainA2 = stepSummary.find((r) => r.step === 2 && r.percent < 25)
  const remainB2 = stepSummary.find((r) => r.step === 3 && r.percent < 25)

  return (
    <main className="min-h-screen bg-muted/30">
      <AssessmentResults 
        LS_KEYS={LS_KEYS} 
        finalHighest={finalHighest} 
        remainA2={remainA2} 
        remainB2={remainB2} 
        resetAll={resetAll} 
        setIntegrityNotice={setIntegrityNotice} 
        setState={setState} 
        stepSummary={stepSummary}
      />
    </main>
  )
};