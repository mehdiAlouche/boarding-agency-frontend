import { Badge } from '@/shared/ui/badge';

export function SkillsDisplay({ skills }: { skills: string[] }) {
  if (!skills.length) {
    return <p className="text-sm text-muted-foreground">No extracted skills yet.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <Badge key={skill} variant="secondary">
          {skill}
        </Badge>
      ))}
    </div>
  );
}
