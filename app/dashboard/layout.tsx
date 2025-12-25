import type { Metadata } from 'next';
import { DashboardSidebar } from '@/components/dashboard/sidebar';

export const metadata: Metadata = {
  title: 'Dashboard | BoostCV',
  description: 'Create ATS-optimized, professionally designed resumes that land interviews. No credit card, no hidden fees—just free, forever.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className="transition-all duration-300 lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}