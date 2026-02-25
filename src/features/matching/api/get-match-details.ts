import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

import type { Match } from '../types/match.types';

export const getMatchDetails = async (id: string): Promise<Match> => {
  const { data } = await axios.get<Match>(API_ENDPOINTS.MATCHING.DETAILS(id));
  return data;
};
