import type { HousingOption } from '../types/resource.types';
import { ResourceCard } from './ResourceCard';

export function HousingList({ items }: { items: HousingOption[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <ResourceCard key={item.id} resource={item} />
      ))}
    </div>
  );
}
