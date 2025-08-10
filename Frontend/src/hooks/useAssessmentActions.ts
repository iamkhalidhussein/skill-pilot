import { Step } from "@/types/tests";

const useAssessmentActions = (
    step1Locked: any, 
    initStep: any, 
    isTesting: any, 
    setState: any,
    showProceed: any,
    setShowProceed: any,
    setShowSubmit: any, 
    finalizeOrProceed: any
) => {
    
    const handleStart = async () => {
        if (step1Locked) return
        await initStep(1)
    };
    
    const handleAnswer = (optIndex: number) => {
        if (!isTesting) return
        setState((prev: any) => {
            const answers = [...prev.answers]
            answers[prev.currentIndex] = optIndex
            return { ...prev, answers }
        })
    };
    
    const goPrev = () => {
        setState((prev: any) => ({ ...prev, currentIndex: Math.max(0, prev.currentIndex - 1) }))
    };
    
    const goNext = () => {
        setState((prev: any) => ({ ...prev, currentIndex: Math.min(prev.questions.length - 1, prev.currentIndex + 1) }))
    };
    
    // Proceed dialog confirm
    const handleProceedConfirm = async () => {
        const ns = showProceed.nextStep ?? 2
        setShowProceed({ open: false, nextStep: null })
        await initStep(ns as Step)
    };

    const handleSubmit = () => {
        setShowSubmit(false)
        finalizeOrProceed(false)
    }

    // Allow changing time per question on intro
    // const handleMinutesChange = (delta: number) => {
    //     setState((prev) => {
    //     const next = Math.max(0.5, Math.min(5, prev.minutesPerQuestion + delta))
    //     return { ...prev, minutesPerQuestion: next }
    //     })
    // }

    return { handleStart, handleAnswer, goPrev, goNext, handleProceedConfirm, handleSubmit };
};

export default useAssessmentActions;
