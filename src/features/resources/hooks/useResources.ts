import { useQuery } from '@tanstack/react-query';

import { getCommunity } from '../api/get-community';
import { getHousing } from '../api/get-housing';
import { getIntegration } from '../api/get-integration';

export const useResources = () => {
  const housing = useQuery({ queryKey: ['resources', 'housing'], queryFn: getHousing });
  const integration = useQuery({
    queryKey: ['resources', 'integration'],
    queryFn: getIntegration,
  });
  const community = useQuery({ queryKey: ['resources', 'community'], queryFn: getCommunity });

  return { housing, integration, community };
};
