'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type AuthLayoutProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkHref: string;
  footerLinkText: string;
};

export function AuthLayout({
  eyebrow,
  title,
  subtitle,
  children,
  footerText,
  footerLinkHref,
  footerLinkText,
}: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-24 overflow-hidden bg-[#0F0A0A]">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1212] via-[#0F0A0A] to-[#0a0606]" />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[10%] w-[400px] h-[400px] bg-gold-600/5 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl px-6 sm:px-10 pt-10 pb-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-center">
            <div className="relative w-14 h-14">
              <Image
                src="/Shelibaas_logo.png"
                alt="Shelibaas"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-serif text-xl text-white mt-3 tracking-wide">
              Shel<span className="text-gold-400">ibaas</span>
            </span>
          </Link>

          {/* Heading */}
          <div className="text-center mt-7">
            <p className="text-gold-400 text-[11px] uppercase tracking-[0.3em] mb-2">{eyebrow}</p>
            <h1 className="font-serif text-3xl text-white">{title}</h1>
            <p className="text-white/50 text-sm mt-2">{subtitle}</p>
          </div>

          <div className="mt-8">{children}</div>
        </div>

        {/* Footer link */}
        <p className="text-center text-sm text-white/50 mt-6">
          {footerText}{' '}
          <Link href={footerLinkHref} className="text-gold-400 font-medium hover:text-gold-300 hover:underline transition-colors">
            {footerLinkText}
          </Link>
        </p>

        <p className="text-center text-[11px] text-white/25 mt-4">
          Protected by Shelibaas · Dhaka, Bangladesh
        </p>
      </motion.div>
    </div>
  );
}
