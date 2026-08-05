import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Providers } from '@/components/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Libaas Gallery — Couture & Pret Clothing',
  description:
    "The Libaas Gallery — Bangladesh's premium curated fashion destination. Discover handpicked designer wear, luxury pret, sarees, and everyday elegance, all in one trusted gallery.",
  keywords: ['libaas', 'clothing', 'couture', 'luxury pret', 'saree', 'sherwani', 'lawn', 'Bangladesh fashion'],
  icons: {
    icon: '/Libaas_logo.png',
    apple: '/Libaas_logo.png',
  },
  openGraph: {
    title: 'The Libaas Gallery — Couture & Pret Clothing',
    description: 'Where heritage meets modern elegance. Shop couture, luxury pret, unstitched lawn, sarees and menswear.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
