import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui";

interface Props {
    showSubmit: boolean
    setShowSubmit: React.Dispatch<React.SetStateAction<boolean>>
    unansweredCount: number
    handleSubmit: () => void
};

export const SubmitDialog = ({ showSubmit, setShowSubmit, unansweredCount, handleSubmit }: Props) => {
    return (
            <Dialog open={showSubmit} onOpenChange={setShowSubmit}>
            <DialogContent className="bg-gray-400">
                <DialogHeader>
                <DialogTitle>Submit Test</DialogTitle>
                <DialogDescription>Unanswered: {unansweredCount}</DialogDescription>
                </DialogHeader>
                <div className="text-sm text-muted-foreground">Once submitted, you cannot change your answers.</div>
                <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setShowSubmit(false)}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};