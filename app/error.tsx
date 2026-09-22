'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#0F0A0A] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1212] via-[#0F0A0A] to-[#0a0606]" />
      </div>
      <div className="relative text-center max-w-md">
        <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-4">Something went wrong</p>
        <h1 className="font-serif text-4xl text-white mb-4">Oops — a thread came loose</h1>
        <p className="text-white/50 text-sm mb-8">
          We hit an unexpected error. Please try again, or head back home.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 text-[#0F0A0A] text-xs font-semibold uppercase tracking-widest hover:bg-gold-400 transition-colors rounded-xl"
          >
            <RotateCcw size={14} /> Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white text-xs font-semibold uppercase tracking-widest hover:border-gold-500 hover:text-gold-400 transition-colors rounded-xl"
          >
            <Home size={14} /> Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
