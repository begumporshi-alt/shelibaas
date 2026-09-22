import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Sign In',
  description: 'Sign in to your Shelibaas account to track orders, manage your wishlist, and check out faster.',
  path: '/signin',
});

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
