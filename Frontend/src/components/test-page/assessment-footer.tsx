import { Alert, AlertDescription, AlertTitle, Button, CardFooter, ShieldX } from "../ui";

interface Props {
    step1Locked: boolean
    handleStart: () => Promise<void>
}

export const AssessmentFooter = ({ step1Locked, handleStart }: Props) => {
    return (
        <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-3 p-6">
          {step1Locked ? (
            <Alert className="w-full">
              <ShieldX className="h-4 w-4" />
              <AlertTitle>Retest blocked</AlertTitle>
              <AlertDescription>
                You previously failed Step 1 with a score below 25%. Retakes are not permitted.
              </AlertDescription>
            </Alert>
          ) : (
            <Button size="lg" className="w-full sm:w-auto" onClick={handleStart}>
              Start Assessment
            </Button>
          )}
          <div className="text-xs text-muted-foreground">
            Integrity measures: fullscreen, copy/paste disabled, tab switching monitored.
          </div>
        </CardFooter>
    )
};