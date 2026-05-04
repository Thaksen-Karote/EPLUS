import type { Metadata } from 'next';
import ComingSoonContent from '@/components/ComingSoonContent';

export const metadata: Metadata = {
  title: 'Coming Soon | Engineering Plus',
  description: 'This page is under construction. Engineering Plus EPC solutions.',
};

export default function ComingSoonPage() {
  return <ComingSoonContent />;
}
