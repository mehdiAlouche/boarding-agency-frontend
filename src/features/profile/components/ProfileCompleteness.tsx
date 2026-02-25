import { ProgressBar } from '@/shared/components/ProgressBar';

export function ProfileCompleteness({ score }: { score: number }) {
  return <ProgressBar value={score} label="Profile completeness" />;
}
