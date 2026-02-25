'use client';

import { Menu } from 'lucide-react';

import { Button } from '@/shared/ui/button';

export function MobileNav() {
  return (
    <div className="border-b border-slate-200/80 bg-white/90 p-3 backdrop-blur md:hidden">
      <Button variant="outline" size="icon" className="border-slate-300" aria-label="Open navigation">
        <Menu className="h-5 w-5" />
      </Button>
    </div>
  );
}
