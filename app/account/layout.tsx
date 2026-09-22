import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'My Account',
  description: 'Manage your Shelibaas account — orders, addresses, wishlist, and profile settings.',
  path: '/account',
});

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
