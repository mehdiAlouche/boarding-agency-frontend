import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cancelAppointment } from '../api/cancel-appointment';

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
};
