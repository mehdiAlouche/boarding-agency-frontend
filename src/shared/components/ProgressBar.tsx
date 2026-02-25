import { Progress } from '@/shared/ui/progress';

interface ProgressBarProps {
  value: number;
  label?: string;
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      {label ? <p className="text-sm font-medium">{label}</p> : null}
      <Progress value={value} max={100} />
      <p className="text-xs text-muted-foreground">{value}%</p>
    </div>
  );
}
