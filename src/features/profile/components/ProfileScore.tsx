import { Progress } from '@/shared/ui/progress';

export function ProfileScore({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <Progress value={score} max={100} />
      <span className="text-sm font-medium">{score}/100</span>
    </div>
  );
}
