import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { mockRegister } from '@/mocks/auth.mock';

import type { AuthResponse, RegisterRequest } from '../types/auth.types';

export const register = async (payload: RegisterRequest): Promise<AuthResponse> => {
  const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

  if (useMockApi) {
    return mockRegister(payload.email, payload.firstName, payload.lastName);
  }

  const { data } = await axios.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, payload);
  return data;
};
