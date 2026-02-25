import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { mockGetMatches } from '@/mocks/matching.mock';

import type { Match } from '../types/match.types';

export const getMatches = async (filters?: Record<string, string>): Promise<Match[]> => {
  const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

  if (useMockApi) {
    return mockGetMatches(filters);
  }

  const { data } = await axios.get<Match[]>(API_ENDPOINTS.MATCHING.LIST, {
    params: filters,
  });
  return data;
};
