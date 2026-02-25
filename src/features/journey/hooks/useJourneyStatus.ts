import { useQuery } from '@tanstack/react-query';

import { getJourneyStatus } from '../api/get-journey-status';

export const useJourneyStatus = () => {
  return useQuery({
    queryKey: ['journey-status'],
    queryFn: getJourneyStatus,
  });
};
