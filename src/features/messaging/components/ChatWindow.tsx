'use client';

import { useEffect, useMemo, useRef } from 'react';

import { LoadingSpinner } from '@/shared/components/LoadingSpinner';

import { useMessages } from '../hooks/useMessages';
import { useRealtimeMessages } from '../hooks/useRealtimeMessages';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';

export function ChatWindow({ conversationId }: { conversationId: string }) {
  const { data, isLoading, sendMessage } = useMessages(conversationId);
  useRealtimeMessages(conversationId);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const messages = useMemo(() => data ?? [], [data]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!conversationId) {
    return <p className="text-sm text-muted-foreground">Select a conversation</p>;
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex h-[500px] flex-col justify-between rounded border p-3">
      <div className="space-y-2 overflow-y-auto">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} isOwn={false} />
        ))}
        <div ref={bottomRef} />
      </div>

      <MessageInput
        sending={sendMessage.isPending}
        onSend={(content) =>
          sendMessage.mutateAsync({ conversationId, content }).then(() => undefined)
        }
      />
    </div>
  );
}
