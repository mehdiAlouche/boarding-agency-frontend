import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { STORAGE_KEYS } from '@/constants/storage-keys';
import { getSocket, initSocket } from '@/lib/socket';

import type { Message } from '../types/message.types';

export function useRealtimeMessages(conversationId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) ?? undefined;
    initSocket(token);

    const socket = getSocket();
    if (!socket || !conversationId) return;

    const onNewMessage = (message: Message) => {
      if (message.conversationId !== conversationId) return;

      queryClient.setQueryData<Message[]>(['messages', conversationId], (old) => [
        ...(old ?? []),
        message,
      ]);
    };

    socket.on('message:new', onNewMessage);

    return () => {
      socket.off('message:new', onNewMessage);
    };
  }, [conversationId, queryClient]);
}
