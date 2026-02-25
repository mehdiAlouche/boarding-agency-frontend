'use client';

import { useResources } from '@/features/resources';
import { CommunityEvents } from '@/features/resources/components/CommunityEvents';
import { HousingList } from '@/features/resources/components/HousingList';
import { IntegrationGuide } from '@/features/resources/components/IntegrationGuide';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';

export default function ResourcesPage() {
  const { housing, integration, community } = useResources();

  if (housing.isLoading || integration.isLoading || community.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Support</p>
        <h2 className="text-3xl font-bold text-slate-900">Resources</h2>
      </div>
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Housing</h2>
        <HousingList items={housing.data ?? []} />
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Integration</h2>
        <IntegrationGuide items={integration.data ?? []} />
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Community</h2>
        <CommunityEvents items={community.data ?? []} />
      </section>
    </div>
  );
}
