import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Create Account',
  description: 'Create a Shelibaas account for a personalized shopping experience — order tracking, wishlist, and faster checkout.',
  path: '/signup',
});

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
