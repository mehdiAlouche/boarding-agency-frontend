'use client';

import { Input } from '@/shared/ui/input';

import type { MatchFilters as Filters } from '../types/match.types';

interface MatchFiltersProps {
  value: Filters;
  onChange: (next: Filters) => void;
}

export function MatchFilters({ value, onChange }: MatchFiltersProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <Input
        placeholder="Filter by location"
        value={value.location ?? ''}
        onChange={(event) => onChange({ ...value, location: event.target.value })}
      />
      <Input
        placeholder="Filter by industry"
        value={value.industry ?? ''}
        onChange={(event) => onChange({ ...value, industry: event.target.value })}
      />
    </div>
  );
}
