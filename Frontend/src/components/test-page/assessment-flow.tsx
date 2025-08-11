export const AssessmentFlow = () => {
    
    const steps = [
        { title: "Step 1 — A1 & A2", rules: ["<25% → Fail", "25–49.99% → A1", "50–74.99% → A2", "≥75% → A2 + Step 2"] },
        { title: "Step 2 — B1 & B2", rules: ["<25% → Remain A2", "25–49.99% → B1", "50–74.99% → B2", "≥75% → B2 + Step 3"] },
        { title: "Step 3 — C1 & C2", rules: ["<25% → Remain B2", "25–49.99% → C1", "≥50% → C2"] }
    ];

    return (
        <section className="rounded-lg border-2 border-gray-200 bg-card">
            <div className="p-4 md:p-6">
                <h3 className="font-semibold mb-3">3-Step Assessment Flow</h3>
                <div className="grid gap-4 md:grid-cols-3">
                {steps.map((s, idx) => (
                    <div key={idx} className="rounded-lg border-2 p-3 border-gray-200">
                    <div className="font-semibold">{s.title}</div>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                        {s.rules.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                    </div>
                ))}
                </div>
            </div>
        </section>
    )
};