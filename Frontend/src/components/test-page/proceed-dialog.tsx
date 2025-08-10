import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui";

interface Props {
    showProceed: { open: boolean; nextStep: number | null }
    setShowProceed: any
    handleProceedConfirm: () => Promise<void>
};

export const ProceedDialog = ({ showProceed, setShowProceed, handleProceedConfirm }: Props) => {
    return (
        <Dialog open={showProceed.open} onOpenChange={(open) => setShowProceed((s: any) => ({ ...s, open }))}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Proceed to Step {showProceed.nextStep}</DialogTitle>
                <DialogDescription>You met the threshold to continue.</DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setShowProceed({ open: false, nextStep: null })}>
                    Not now
                </Button>
                <Button onClick={handleProceedConfirm}>Proceed</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};