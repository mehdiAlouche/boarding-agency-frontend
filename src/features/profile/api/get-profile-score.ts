import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const getProfileScore = async (): Promise<{ score: number }> => {
  const { data } = await axios.get<{ score: number }>(API_ENDPOINTS.PROFILE.SCORE);
  return data;
};
