import type { Conversation } from '../types/message.types';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: ConversationListProps) {
  return (
    <div className="space-y-2">
      {conversations.map((conversation) => (
        <button
          key={conversation.id}
          className={`w-full rounded border p-3 text-left ${
            selectedId === conversation.id ? 'bg-muted' : ''
          }`}
          onClick={() => onSelect(conversation.id)}
        >
          {conversation.title}
        </button>
      ))}
    </div>
  );
}
