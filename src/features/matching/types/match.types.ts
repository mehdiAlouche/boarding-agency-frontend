export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  logo?: string | null;
}

export interface Match {
  id: string;
  company: Company;
  score: number;
  rank: number;
  explanation?: string;
}

export interface MatchExplanation {
  matchId: string;
  explanation: string;
}

export interface MatchFilters {
  location?: string;
  industry?: string;
}
