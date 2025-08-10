import { Card, CardContent, CardDescription, CardHeader, CardTitle, CheckCircle2 } from "../ui";
import { CertificateSection } from "./certificate-section";
import { LevelRetentionAlert } from "./level-retention-alert";
import { RetestNote } from "./retest-note";
import { StepSummaryList } from "./step-summary-list";

export const AssessmentResults = ({ stepSummary, remainA2, remainB2, LS_KEYS, finalHighest, resetAll, setIntegrityNotice, setState }: any) => {
    return (
        <div className="max-w-5xl mx-auto p-6">
            <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                Assessment Results
                </CardTitle>
                <CardDescription>Review your performance and download your certificate.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <StepSummaryList stepSummary={stepSummary}/>

                {(remainA2 || remainB2) && (
                <LevelRetentionAlert remainA2={remainA2} remainB2={remainB2}/>
                )}

                <CertificateSection 
                    LS_KEYS={LS_KEYS} 
                    finalHighest={finalHighest} 
                    resetAll={resetAll} 
                    setIntegrityNotice={setIntegrityNotice} 
                    setState={setState}
                />
                <RetestNote/>
            </CardContent>
        </Card>
      </div>
    )
};