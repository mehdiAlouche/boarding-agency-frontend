import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

import type { Appointment } from '../types/appointment.types';

export const getAppointments = async (): Promise<Appointment[]> => {
  const { data } = await axios.get<Appointment[]>(API_ENDPOINTS.APPOINTMENTS.LIST);
  return data;
};
