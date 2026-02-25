import Link from 'next/link';

import type { Resource } from '../types/resource.types';

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="rounded border p-4">
      <h4 className="font-semibold">{resource.title}</h4>
      <p className="text-sm text-muted-foreground">{resource.description}</p>
      {resource.link ? (
        <Link
          href={resource.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary"
        >
          Open resource
        </Link>
      ) : null}
    </div>
  );
}
