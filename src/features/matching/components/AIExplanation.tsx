export function AIExplanation({ explanation }: { explanation: string }) {
  return (
    <div className="rounded-lg border bg-blue-50 p-4">
      <h4 className="mb-2 font-semibold">Why this match?</h4>
      <p className="text-sm text-gray-700">{explanation}</p>
    </div>
  );
}
