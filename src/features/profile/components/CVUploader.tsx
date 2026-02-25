'use client';

import { useRef } from 'react';

import { Button } from '@/shared/ui/button';

import { useUploadCV } from '../hooks/useUploadCV';

export function CVUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const mutation = useUploadCV();

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await mutation.mutateAsync(file);
  };

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx"
        onChange={handleFile}
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Uploading...' : 'Upload CV'}
      </Button>
      {mutation.error ? (
        <p className="text-sm text-destructive">{mutation.error.message}</p>
      ) : null}
    </div>
  );
}
