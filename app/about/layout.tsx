import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Our Story',
  description:
    'Learn the story behind Shelibaas — Bangladesh’s trusted destination for premium curated fashion, handpicked designer wear, and timeless elegance.',
  path: '/about',
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
