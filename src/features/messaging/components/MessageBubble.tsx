import type { Message } from '../types/message.types';

export function MessageBubble({
  message,
  isOwn,
}: {
  message: Message;
  isOwn: boolean;
}) {
  return (
    <div
      className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
        isOwn ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted'
      }`}
    >
      {message.content}
    </div>
  );
}
