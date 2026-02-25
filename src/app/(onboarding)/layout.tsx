import { ROUTES } from '@/constants/routes';

const steps = [
  ROUTES.ONBOARDING_WELCOME,
  ROUTES.ONBOARDING_PROFILE_SETUP,
  ROUTES.ONBOARDING_CV_UPLOAD,
];

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur">
          <p className="text-sm font-medium text-blue-600">Onboarding</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">Complete your setup</h2>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {steps.map((step) => (
              <div key={step} className="h-2 rounded bg-slate-200" />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">{children}</div>
      </div>
    </div>
  );
}
