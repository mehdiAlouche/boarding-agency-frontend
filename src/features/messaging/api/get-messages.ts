import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

import type { Message } from '../types/message.types';

export const getMessages = async (conversationId: string): Promise<Message[]> => {
  const { data } = await axios.get<Message[]>(
    API_ENDPOINTS.MESSAGING.MESSAGES(conversationId),
  );
  return data;
};
