import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

import type { Message } from '../types/message.types';

export const sendMessage = async (payload: {
  conversationId: string;
  content: string;
}): Promise<Message> => {
  const { data } = await axios.post<Message>(API_ENDPOINTS.MESSAGING.SEND, payload);
  return data;
};
