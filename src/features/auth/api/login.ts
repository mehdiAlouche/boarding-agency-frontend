import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { mockLogin } from '@/mocks/auth.mock';

import type { AuthResponse, LoginRequest } from '../types/auth.types';

export const login = async (payload: LoginRequest): Promise<AuthResponse> => {
  const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

  if (useMockApi) {
    return mockLogin(payload.email, payload.password);
  }

  const { data } = await axios.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, payload);
  return data;
};
