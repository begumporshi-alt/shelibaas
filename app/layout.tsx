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
  title: 'Shelibaas — Couture & Pret Clothing',
  description:
    "Shelibaas — Bangladesh's premium curated fashion destination. Discover handpicked designer wear, luxury pret, sarees, and everyday elegance, all in one trusted gallery.",
  keywords: ['shelibaas', 'clothing', 'couture', 'luxury pret', 'saree', 'sherwani', 'lawn', 'Bangladesh fashion'],
  icons: {
    icon: '/Shelibaas_logo.png',
    apple: '/Shelibaas_logo.png',
  },
  openGraph: {
    title: 'Shelibaas — Couture & Pret Clothing',
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
