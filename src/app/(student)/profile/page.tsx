import { ProfileForm } from '@/features/profile';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Student Profile</p>
        <h2 className="text-3xl font-bold text-slate-900">Profile</h2>
      </div>
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <ProfileForm />
      </div>
    </div>
  );
}
