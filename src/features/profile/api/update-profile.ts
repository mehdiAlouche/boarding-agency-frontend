import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

import type { ProfileResponse, UpdateProfilePayload } from '../types/profile.types';

export const updateProfile = async (
  payload: UpdateProfilePayload,
): Promise<ProfileResponse> => {
  const { data } = await axios.put<ProfileResponse>(API_ENDPOINTS.PROFILE.UPDATE, payload);
  return data;
};
