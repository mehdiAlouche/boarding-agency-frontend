import { useQuery } from '@tanstack/react-query';

import { getProfile } from '../api/get-profile';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 10 * 60 * 1000,
  });
};
