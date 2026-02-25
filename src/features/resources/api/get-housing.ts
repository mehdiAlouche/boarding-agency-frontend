import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

import type { HousingOption } from '../types/resource.types';

export const getHousing = async (): Promise<HousingOption[]> => {
  const { data } = await axios.get<HousingOption[]>(API_ENDPOINTS.RESOURCES.HOUSING);
  return data;
};
