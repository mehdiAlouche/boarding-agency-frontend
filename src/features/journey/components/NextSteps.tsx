export function NextSteps({ steps }: { steps: string[] }) {
  return (
    <div className="rounded border p-4">
      <h3 className="font-semibold">Next Steps</h3>
      <ul className="mt-2 list-disc pl-5 text-sm">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
    </div>
  );
}
