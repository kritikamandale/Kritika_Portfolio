import MindsetPageClient from '../../src/sections/Mindset/MindsetPageClient';

export const metadata = {
  title: '/mindset — Kritika Mandale',
  description: 'The core principles that drive my work and personal development.',
  alternates: {
    canonical: '/mindset/',
  },
};

export default function MindsetPage() {
  return <MindsetPageClient />;
}
