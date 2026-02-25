import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const cancelAppointment = async (appointmentId: string): Promise<void> => {
  await axios.delete(API_ENDPOINTS.APPOINTMENTS.CANCEL(appointmentId));
};
