import { useQuery } from '@tanstack/react-query';

import { getAppointments } from '../api/get-appointments';

export const useAppointments = () => {
  return useQuery({ queryKey: ['appointments'], queryFn: getAppointments });
};
