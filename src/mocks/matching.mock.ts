import type { Match } from '@/features/matching/types/match.types';

const MOCK_DELAY_MS = 500;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_MATCHES: Match[] = [
  {
    id: 'match_001',
    company: {
      id: 'company_001',
      name: 'Blue Harbor Hotels',
      industry: 'Hospitality',
      location: 'Paris',
      logo: null,
    },
    score: 91,
    rank: 1,
    explanation: 'Strong language skills and customer-service background align with this role.',
  },
  {
    id: 'match_002',
    company: {
      id: 'company_002',
      name: 'Metro Stay Group',
      industry: 'Hospitality',
      location: 'Lyon',
      logo: null,
    },
    score: 84,
    rank: 2,
    explanation: 'Profile shows transferable front-desk and operations capabilities.',
  },
  {
    id: 'match_003',
    company: {
      id: 'company_003',
      name: 'Nordic Guest Services',
      industry: 'Tourism',
      location: 'Bordeaux',
      logo: null,
    },
    score: 77,
    rank: 3,
    explanation: 'Good fit for multilingual communication and teamwork requirements.',
  },
];

export const mockGetMatches = async (
  filters?: Record<string, string>
): Promise<Match[]> => {
  await sleep(MOCK_DELAY_MS);

  if (!filters) {
    return MOCK_MATCHES;
  }

  return MOCK_MATCHES.filter((match) => {
    const locationFilter = filters.location?.toLowerCase();
    const industryFilter = filters.industry?.toLowerCase();

    const locationMatches = locationFilter
      ? match.company.location.toLowerCase().includes(locationFilter)
      : true;

    const industryMatches = industryFilter
      ? match.company.industry.toLowerCase().includes(industryFilter)
      : true;

    return locationMatches && industryMatches;
  });
};
