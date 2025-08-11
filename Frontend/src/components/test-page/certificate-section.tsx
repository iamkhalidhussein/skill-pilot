import React from "react";
import { Button, Separator } from "../ui";
import { ShieldCheck, Lock } from "lucide-react";

interface Props {
    finalHighest: string | null
    LS_KEYS: any
    setState: React.Dispatch<any>
    setIntegrityNotice: React.Dispatch<any>
    resetAll: (keys: any, setState: React.Dispatch<any>, setIntegrityNotice: React.Dispatch<any>) => void
}

export const CertificateSection = ({ finalHighest, LS_KEYS, setState, setIntegrityNotice, resetAll }: Props) => {
    return (
        <section className="rounded-lg border bg-background p-6">
        <div id="certificate" className="mx-auto max-w-xl text-center">
            <div className="text-sm text-muted-foreground">Digital Certificate</div>
            <div className="text-3xl font-bold mt-1">Certification of Digital Competence</div>
            <Separator className="my-4" />
            <div className="text-muted-foreground">Awarded to</div>
            <div className="text-2xl font-semibold mt-1">Candidate</div>
            <div className="mt-4">
            {finalHighest ? (
                <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 text-white px-4 py-2">
                <ShieldCheck className="h-5 w-5" />
                Highest Level Achieved: {finalHighest}
                </div>
            ) : (
                <div className="inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
                <Lock className="h-5 w-5" />
                No certification awarded
                </div>
            )}
            </div>
            <div className="mt-6 text-xs text-muted-foreground">
            Issued on {new Date().toLocaleDateString()} • Test School Levels A1–C2
            </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2">
            <Button variant="outline" onClick={() => window.print()}>
                Download / Print
            </Button>
            <Button onClick={() => resetAll(LS_KEYS, setState, setIntegrityNotice)}>Take again (demo)</Button>
        </div>
    </section>
    )
};