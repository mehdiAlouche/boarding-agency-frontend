export interface Advisor {
  id: string;
  name: string;
  specialization: string;
}

export interface Appointment {
  id: string;
  advisor: Advisor;
  date: string;
  status: 'booked' | 'cancelled' | 'completed';
  notes?: string;
}

export interface AvailableSlot {
  id: string;
  advisorId: string;
  date: string;
}

export interface BookingRequest {
  advisorId: string;
  slotId: string;
}
