import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { LoginForm } from '@/features/auth';

export default function LoginPage() {
  return (
    <div className="relative mx-auto grid max-w-4xl gap-8 md:grid-cols-[1fr_420px] md:items-center">
      <Link
        href="/"
        className="absolute -top-16 left-0 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
      <div className="space-y-4 text-center md:text-left">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Welcome back</p>
        <h2 className="text-3xl font-bold text-slate-900">Sign in to continue your journey</h2>
        <p className="text-slate-600">Access matches, profile progress, appointments, and messages.</p>
      </div>
      <LoginForm />
    </div>
  );
}
