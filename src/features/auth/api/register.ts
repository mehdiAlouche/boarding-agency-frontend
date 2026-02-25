import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

import type { AuthResponse, RegisterRequest } from '../types/auth.types';

export const register = async (payload: RegisterRequest): Promise<AuthResponse> => {
  const { data } = await axios.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, payload);
  return data;
};
