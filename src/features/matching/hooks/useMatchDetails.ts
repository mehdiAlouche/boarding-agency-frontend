import { useQuery } from '@tanstack/react-query';

import { getMatchDetails } from '../api/get-match-details';

export const useMatchDetails = (id: string) => {
  return useQuery({
    queryKey: ['match', id],
    queryFn: () => getMatchDetails(id),
    enabled: Boolean(id),
  });
};
