import type { Milestone } from '../types/journey.types';

export function MilestoneCard({ milestone }: { milestone: Milestone }) {
  return (
    <div className="rounded border p-4">
      <h4 className="font-semibold">{milestone.title}</h4>
      <p className="text-sm text-muted-foreground">{milestone.description}</p>
    </div>
  );
}
