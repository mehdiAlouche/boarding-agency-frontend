'use client';

import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

interface MessageInputProps {
  onSend: (content: string) => Promise<void>;
  sending: boolean;
}

export function MessageInput({ onSend, sending }: MessageInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!value.trim()) return;

    await onSend(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Type a message"
        aria-label="Message input"
      />
      <Button type="submit" disabled={sending}>
        {sending ? 'Sending...' : 'Send'}
      </Button>
    </form>
  );
}
