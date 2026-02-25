import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { mockGetProfile } from '@/mocks/profile.mock';

import type { Profile, ProfileResponse } from '../types/profile.types';

export const getProfile = async (): Promise<Profile> => {
  const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

  if (useMockApi) {
    return mockGetProfile();
  }

  const { data } = await axios.get<ProfileResponse>(API_ENDPOINTS.PROFILE.GET);
  return {
    ...data,
    lastUpdated: new Date(data.lastUpdated),
  };
};
