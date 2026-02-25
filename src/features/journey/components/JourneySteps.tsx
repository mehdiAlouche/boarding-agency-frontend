import type { JourneyStep } from '../types/journey.types';

export function JourneySteps({ steps }: { steps: JourneyStep[] }) {
  return (
    <ul className="space-y-2">
      {steps.map((step) => (
        <li key={step.id} className="rounded border p-3 text-sm">
          {step.title} — {step.status}
        </li>
      ))}
    </ul>
  );
}
