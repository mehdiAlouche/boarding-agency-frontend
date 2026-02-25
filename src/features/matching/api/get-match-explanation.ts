import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

import type { MatchExplanation } from '../types/match.types';

export const getMatchExplanation = async (id: string): Promise<MatchExplanation> => {
  const { data } = await axios.get<MatchExplanation>(API_ENDPOINTS.MATCHING.EXPLANATION(id));
  return data;
};
