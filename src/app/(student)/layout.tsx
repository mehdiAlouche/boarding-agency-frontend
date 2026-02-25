import { Footer } from '@/shared/components/layout/Footer';
import { Header } from '@/shared/components/layout/Header';
import { MobileNav } from '@/shared/components/layout/MobileNav';
import { Sidebar } from '@/shared/components/layout/Sidebar';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/40 to-white">
      <MobileNav />
      <Header />
      <div className="mx-auto flex w-full">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 p-2">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
