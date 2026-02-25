export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Boarding</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Student Platform</h1>
          <p className="mt-2 text-slate-600">Manage your internship journey with a clean, guided flow.</p>
        </div>
        {children}
      </div>
    </div>
  );
}
