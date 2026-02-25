import Link from 'next/link';

import { ROUTES } from '@/constants/routes';
import { Button } from '@/shared/ui/button';

export default function OnboardingWelcomePage() {
  return (
    <div className="space-y-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Step 1 of 3</p>
      <h1 className="text-3xl font-bold text-slate-900">Welcome to your journey</h1>
      <p className="text-slate-600">Let&apos;s set up your profile and upload your CV.</p>
      <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
        <Link href={ROUTES.ONBOARDING_PROFILE_SETUP}>Start onboarding</Link>
      </Button>
    </div>
  );
}
