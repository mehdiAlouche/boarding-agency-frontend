import type { Profile } from '@/features/profile/types/profile.types';

const MOCK_DELAY_MS = 500;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockGetProfile = async (): Promise<Profile> => {
  await sleep(MOCK_DELAY_MS);

  return {
    id: 'u_demo_001',
    firstName: 'Demo',
    lastName: 'Student',
    email: 'demo@student.com',
    phone: '+33 6 12 34 56 78',
    cvUrl: null,
    skills: ['English', 'Customer Service', 'MS Office', 'Communication'],
    completenessScore: 65,
    profileScore: 72,
    lastUpdated: new Date(),
  };
};
