import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Shipping & Returns',
  description: 'Shelibaas shipping and returns policy — delivery across Bangladesh, easy 7-day returns on non-couture items.',
  path: '/shipping',
});

export default function ShippingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
