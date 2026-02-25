import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadCV } from '../api/upload-cv';

export const useUploadCV = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadCV,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
