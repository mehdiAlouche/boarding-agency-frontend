'use client';

import { EmptyState } from '@/shared/components/EmptyState';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';

import { useAppointments } from '../hooks/useAppointments';
import { AppointmentDetails } from './AppointmentDetails';

export function AppointmentList() {
  const { data, isLoading, error } = useAppointments();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-destructive">Failed to load appointments.</p>;

  if (!data?.length) {
    return (
      <EmptyState
        title="No appointments scheduled"
        description="Book your first advisor session."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {data.map((appointment) => (
        <AppointmentDetails key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
}
