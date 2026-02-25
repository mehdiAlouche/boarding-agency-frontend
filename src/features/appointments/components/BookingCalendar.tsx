'use client';

import { Calendar } from '@/shared/ui/calendar';

export function BookingCalendar({
  date,
  onDateChange,
}: {
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
}) {
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={onDateChange}
      className="rounded border"
    />
  );
}
