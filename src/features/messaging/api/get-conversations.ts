import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

import type { Conversation } from '../types/message.types';

export const getConversations = async (): Promise<Conversation[]> => {
  const { data } = await axios.get<Conversation[]>(API_ENDPOINTS.MESSAGING.CONVERSATIONS);
  return data;
};
