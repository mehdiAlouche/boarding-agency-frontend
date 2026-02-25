import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getMessages } from '../api/get-messages';
import { sendMessage } from '../api/send-message';

export const useMessages = (conversationId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => getMessages(conversationId),
    enabled: Boolean(conversationId),
  });

  const send = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
    },
  });

  return {
    ...query,
    sendMessage: send,
  };
};
