import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const refreshToken = async (refreshTokenValue: string): Promise<{ token: string }> => {
  const { data } = await axios.post<{ token: string }>(API_ENDPOINTS.AUTH.REFRESH, {
    refreshToken: refreshTokenValue,
  });
  return data;
};
