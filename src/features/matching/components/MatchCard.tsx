import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';

import type { Match } from '../types/match.types';

export function MatchCard({ match }: { match: Match }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {match.rank}. {match.company.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">
          {match.company.location} • {match.company.industry}
        </p>
        <Progress value={match.score} max={100} />
        <p className="text-sm font-medium">{match.score}% match</p>
      </CardContent>
    </Card>
  );
}
