import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with Shelibaas — visit us in Gulshan, Dhaka, call, email, or send us a message. We usually respond within 24 hours.',
  path: '/contact',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
