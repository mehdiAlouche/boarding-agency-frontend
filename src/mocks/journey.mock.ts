import type { JourneyStatus } from '@/features/journey/types/journey.types';

const MOCK_DELAY_MS = 500;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockGetJourneyStatus = async (): Promise<JourneyStatus> => {
  await sleep(MOCK_DELAY_MS);

  return {
    steps: [
      {
        id: 'step_welcome',
        title: 'Welcome Completed',
        status: 'completed',
        date: '2026-02-10T10:00:00.000Z',
      },
      {
        id: 'step_profile',
        title: 'Profile Setup',
        status: 'current',
        date: '2026-02-13T14:30:00.000Z',
      },
      {
        id: 'step_matching',
        title: 'Matching Review',
        status: 'upcoming',
        date: null,
      },
    ],
    milestones: [
      {
        id: 'ms_account',
        title: 'Account Created',
        description: 'Your account is active and ready to use.',
        completed: true,
      },
      {
        id: 'ms_cv',
        title: 'CV Uploaded',
        description: 'Upload your CV to improve matching quality.',
        completed: false,
      },
    ],
    nextSteps: ['Complete profile details', 'Upload CV', 'Review top company matches'],
  };
};
