'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ROUTES } from '@/constants/routes';
import { cn } from '@/shared/utils/cn';

const links = [
  { href: ROUTES.DASHBOARD, label: 'Dashboard' },
  { href: ROUTES.PROFILE, label: 'Profile' },
  { href: ROUTES.MATCHING, label: 'Matching' },
  { href: ROUTES.JOURNEY, label: 'Journey' },
  { href: ROUTES.APPOINTMENTS, label: 'Appointments' },
 // { href: ROUTES.MESSAGES, label: 'Messages' },
  { href: ROUTES.RESOURCES, label: 'Resources' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-[73px] h-[calc(100vh-73px)] w-64 border-r border-slate-200/80 bg-white/80 p-4 backdrop-blur">
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'block rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              pathname.startsWith(link.href)
                ? 'bg-blue-600 text-white'
                : 'text-slate-700 hover:bg-blue-50 hover:text-slate-900',
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
