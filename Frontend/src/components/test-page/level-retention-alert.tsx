import { ShieldAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// interface Props {
//     remainA2: boolean | undefined
//     remainB2: boolean | undefined
// };

export const LevelRetentionAlert = ({ remainA2, remainB2 }: any) => {
    if(!remainA2 && !remainB2) return null;

    return (
        <Alert>
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Level retention</AlertTitle>
            <AlertDescription className="text-sm">
                {remainA2 ? "Your Step 2 score was below 25%, you remain at A2." : null}
                {remainB2 ? " Your Step 3 score was below 25%, you remain at B2." : null}
            </AlertDescription>
        </Alert>
    )
};