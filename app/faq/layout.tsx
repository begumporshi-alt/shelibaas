import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'FAQs',
  description:
    'Frequently asked questions about Shelibaas — payments, returns, custom tailoring, authenticity, and shipping across Bangladesh.',
  path: '/faq',
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
