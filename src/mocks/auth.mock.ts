import type { AuthResponse } from '@/features/auth/types/auth.types';

const MOCK_DELAY_MS = 500;
const DEMO_EMAIL = 'demo@student.com';
const DEMO_PASSWORD = 'Demo@1234';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockLogin = async (email: string, password: string): Promise<AuthResponse> => {
  await sleep(MOCK_DELAY_MS);

  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    throw new Error('Invalid credentials');
  }

  return {
    token: 'mock_access_token_123',
    refreshToken: 'mock_refresh_token_123',
    user: {
      id: 'u_demo_001',
      email,
      firstName: 'Demo',
      lastName: 'Student',
      profileComplete: false,
    },
  };
};
