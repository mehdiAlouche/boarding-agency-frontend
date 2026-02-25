import type { Advisor } from '../types/appointment.types';

export function AdvisorCard({ advisor }: { advisor: Advisor }) {
  return (
    <div className="rounded border p-4">
      <h4 className="font-semibold">{advisor.name}</h4>
      <p className="text-sm text-muted-foreground">{advisor.specialization}</p>
    </div>
  );
}
