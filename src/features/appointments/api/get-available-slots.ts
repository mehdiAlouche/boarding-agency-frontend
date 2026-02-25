import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

import type { AvailableSlot } from '../types/appointment.types';

export const getAvailableSlots = async (date: string): Promise<AvailableSlot[]> => {
  const { data } = await axios.get<AvailableSlot[]>(API_ENDPOINTS.APPOINTMENTS.SLOTS, {
    params: { date },
  });

  return data;
};
