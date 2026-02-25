import type { Appointment } from '../types/appointment.types';

export function AppointmentDetails({ appointment }: { appointment: Appointment }) {
  return (
    <div className="rounded border p-4">
      <h4 className="font-semibold">{appointment.advisor.name}</h4>
      <p className="text-sm">{new Date(appointment.date).toLocaleString()}</p>
    </div>
  );
}
