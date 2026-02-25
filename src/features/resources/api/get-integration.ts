import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

import type { IntegrationInfo } from '../types/resource.types';

export const getIntegration = async (): Promise<IntegrationInfo[]> => {
  const { data } = await axios.get<IntegrationInfo[]>(API_ENDPOINTS.RESOURCES.INTEGRATION);
  return data;
};
