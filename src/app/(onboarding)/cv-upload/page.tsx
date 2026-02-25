import Link from 'next/link';

import { ROUTES } from '@/constants/routes';
import { CVUploader } from '@/features/profile/components/CVUploader';
import { Button } from '@/shared/ui/button';

export default function OnboardingCVUploadPage() {
  return (
    <div className="space-y-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Step 3 of 3</p>
      <h1 className="text-3xl font-bold text-slate-900">Upload your CV</h1>
      <CVUploader />
      <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
        <Link href={ROUTES.DASHBOARD}>Finish and go to dashboard</Link>
      </Button>
    </div>
  );
}
