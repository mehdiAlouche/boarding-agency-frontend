import { useQuery } from '@tanstack/react-query';

import { getConversations } from '../api/get-conversations';

export const useConversations = () => {
  return useQuery({ queryKey: ['conversations'], queryFn: getConversations });
};
