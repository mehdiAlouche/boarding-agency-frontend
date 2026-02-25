import { Check } from 'lucide-react';

import type { JourneyStep } from '../types/journey.types';

export function JourneyTimeline({ steps }: { steps: JourneyStep[] }) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-start gap-4">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              step.status === 'completed'
                ? 'bg-green-500'
                : step.status === 'current'
                  ? 'bg-blue-500'
                  : 'bg-gray-300'
            }`}
          >
            {step.status === 'completed' ? (
              <Check className="h-4 w-4 text-white" />
            ) : (
              <span className="text-xs text-white">{index + 1}</span>
            )}
          </div>

          <div>
            <h4 className="font-semibold">{step.title}</h4>
            {step.date ? (
              <p className="text-sm text-muted-foreground">
                {new Date(step.date).toLocaleDateString()}
              </p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
