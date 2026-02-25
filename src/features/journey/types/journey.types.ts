export interface JourneyStep {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
  date: string | null;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface JourneyStatus {
  steps: JourneyStep[];
  milestones: Milestone[];
  nextSteps: string[];
}
