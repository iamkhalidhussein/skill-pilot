import { AlertTriangle } from "lucide-react";

export const AssessmentWarning = () => {
    return (
        <section className="rounded-lg border border-gray-200 bg-amber-50">
            <div className="p-4 md:p-6 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-700 mt-0.5" />
                <div>
                <div className="font-semibold text-amber-900 mb-1">Important:</div>
                <p className="text-sm text-amber-800">
                    If you score less than 25% in Step 1, you will not be allowed to retake the assessment.
                </p>
                </div>
            </div>
        </section>
    )
};