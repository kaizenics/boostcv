import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings | BoostCV',
  description: 'Create ATS-optimized, professionally designed resumes that land interviews. No credit card, no hidden fees—just free, forever.',
};

export default function ResumeTemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}