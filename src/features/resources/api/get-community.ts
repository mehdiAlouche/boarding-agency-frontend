import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

import type { CommunityEvent } from '../types/resource.types';

export const getCommunity = async (): Promise<CommunityEvent[]> => {
  const { data } = await axios.get<CommunityEvent[]>(API_ENDPOINTS.RESOURCES.COMMUNITY);
  return data;
};
