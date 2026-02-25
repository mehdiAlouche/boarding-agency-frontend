import { useMutation, useQueryClient } from '@tanstack/react-query';

import { bookAppointment } from '../api/book-appointment';

export const useBookAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
};
