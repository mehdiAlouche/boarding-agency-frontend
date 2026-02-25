import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

import type { Appointment, BookingRequest } from '../types/appointment.types';

export const bookAppointment = async (
  payload: BookingRequest,
): Promise<Appointment> => {
  const { data } = await axios.post<Appointment>(API_ENDPOINTS.APPOINTMENTS.BOOK, payload);
  return data;
};
