import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Size Guide',
  description: 'Find your perfect fit at Shelibaas — size charts for women, men, and kids across all collections.',
  path: '/size-guide',
});

export default function SizeGuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
