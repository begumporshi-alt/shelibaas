import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Checkout',
  description: 'Complete your Shelibaas order — cash on delivery, cards, bKash, and Nagad accepted across Bangladesh.',
  path: '/checkout',
});

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
