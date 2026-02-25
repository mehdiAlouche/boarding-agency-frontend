import type { CommunityEvent } from '../types/resource.types';
import { ResourceCard } from './ResourceCard';

export function CommunityEvents({ items }: { items: CommunityEvent[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <ResourceCard key={item.id} resource={item} />
      ))}
    </div>
  );
}
