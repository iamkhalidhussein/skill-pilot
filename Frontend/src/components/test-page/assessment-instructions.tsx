export const AssessmentInstructions = () => {
    return (
        <section className="rounded-lg border-2 border-gray-200 bg-card">
            <div className="p-4 md:p-6">
              <h3 className="font-semibold mb-3">Instructions</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• 44 questions in this step (22 competencies × 2 levels)</li>
                <li>• Default time: 1 minute per question (configurable)</li>
                <li>• Free navigation between questions</li>
                <li>• Auto-submit when time expires</li>
                <li>• Proceed to the next step if your score meets the threshold</li>
              </ul>
            </div>
        </section>
    )
};