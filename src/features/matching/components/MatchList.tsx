'use client';

import { useMemo, useState } from 'react';

import { EmptyState } from '@/shared/components/EmptyState';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { Button } from '@/shared/ui/button';

import { useMatches } from '../hooks/useMatches';
import type { MatchFilters as Filters } from '../types/match.types';
import { MatchCard } from './MatchCard';
import { MatchFilters } from './MatchFilters';
import { MatchVisualization } from './MatchVisualization';

export function MatchList() {
  const [filters, setFilters] = useState<Filters>({});
  const { data, isLoading, error, refetch } = useMatches(filters);

  const matches = useMemo(() => data ?? [], [data]);

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="space-y-3">
        <p className="text-destructive">{error.message}</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  if (!matches.length) {
    return (
      <EmptyState
        title="No matches yet"
        description="Complete your profile to see company matches."
      />
    );
  }

  return (
    <div className="space-y-4">
      <MatchFilters value={filters} onChange={setFilters} />
      <MatchVisualization matches={matches} />
      <div className="grid gap-3">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
