'use client';

import { useRouter } from 'next/navigation';
import { Bell, LogOut } from 'lucide-react';

import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store';
import { Button } from '@/shared/ui/button';

export function Header() {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    router.push(ROUTES.LOGIN);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Boarding</p>
          <h1 className="text-base font-semibold text-slate-900">Student Platform</h1>
        </div>
        <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        <span className="text-sm text-slate-600">{user?.firstName ?? 'Student'}</span>
        <Button variant="outline" size="sm" className="border-slate-300" onClick={handleLogout}>
          <LogOut className="mr-1 h-4 w-4" /> Logout
        </Button>
        </div>
      </div>
    </header>
  );
}
