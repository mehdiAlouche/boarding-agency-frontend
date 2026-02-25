import type { IntegrationInfo } from '../types/resource.types';
import { ResourceCard } from './ResourceCard';

export function IntegrationGuide({ items }: { items: IntegrationInfo[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <ResourceCard key={item.id} resource={item} />
      ))}
    </div>
  );
}
