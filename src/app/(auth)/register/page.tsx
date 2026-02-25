import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { RegisterForm } from '@/features/auth';

export default function RegisterPage() {
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
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Get started</p>
        <h2 className="text-3xl font-bold text-slate-900">Create your student account</h2>
        <p className="text-slate-600">Join Boarding and start your internship matching process.</p>
      </div>
      <RegisterForm />
    </div>
  );
}
