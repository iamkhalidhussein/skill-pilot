export const RetestNote = () => {
    return (
        <section className="rounded-lg border bg-card p-4">
            <div className="text-sm text-muted-foreground">
                Note: Retest prevention for Step 1 failures is enforced locally here. For production, enforce it on your
                server as well.
            </div>
        </section>
    )
};