export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  status: MessageStatus;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage?: string;
}
