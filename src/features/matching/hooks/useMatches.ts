import { useQuery } from '@tanstack/react-query';

import { getMatches } from '../api/get-matches';
import type { MatchFilters } from '../types/match.types';

export const useMatches = (filters?: MatchFilters) => {
  return useQuery({
    queryKey: ['matches', filters],
    queryFn: () => getMatches(filters as Record<string, string> | undefined),
  });
};
