import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { mockRefreshToken } from '@/mocks/auth.mock';

export const refreshToken = async (refreshTokenValue: string): Promise<{ token: string }> => {
  const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

  if (useMockApi) {
    return mockRefreshToken();
  }

  const { data } = await axios.post<{ token: string }>(API_ENDPOINTS.AUTH.REFRESH, {
    refreshToken: refreshTokenValue,
  });
  return data;
};
