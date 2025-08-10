import { CardDescription, CardHeader, CardTitle, Clock } from "../ui";

export const AssessmentHeader = () => {
    return (
        <CardHeader className="space-y-2">
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100">
                    <Clock className="w-8 h-8 text-emerald-700" />
                </div>
            </div>
            <CardTitle className="text-center text-2xl md:text-3xl">
                Digital Competency Assessment
            </CardTitle>
            <CardDescription className="text-center">
                Step 1 Assessment — Levels A1 & A2
            </CardDescription>
        </CardHeader>
    )
};