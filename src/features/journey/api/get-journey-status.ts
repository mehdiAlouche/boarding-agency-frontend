import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { mockGetJourneyStatus } from '@/mocks/journey.mock';

import type { JourneyStatus } from '../types/journey.types';

export const getJourneyStatus = async (): Promise<JourneyStatus> => {
  const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

  if (useMockApi) {
    return mockGetJourneyStatus();
  }

  const { data } = await axios.get<JourneyStatus>(API_ENDPOINTS.JOURNEY.STATUS);
  return data;
};
