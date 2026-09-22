import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Wishlist',
  description: 'Your saved pieces at Shelibaas — keep track of the designer wear you love.',
  path: '/wishlist',
});

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
