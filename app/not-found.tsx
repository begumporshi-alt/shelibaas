import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#0F0A0A] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1212] via-[#0F0A0A] to-[#0a0606]" />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gold-500/10 rounded-full blur-[120px]" />
      </div>
      <div className="relative text-center max-w-md">
        <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-4">Lost in the gallery</p>
        <h1 className="font-serif text-7xl text-white mb-4">404</h1>
        <p className="text-white/50 text-sm mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 text-[#0F0A0A] text-xs font-semibold uppercase tracking-widest hover:bg-gold-400 transition-colors rounded-xl"
          >
            <Home size={14} /> Back Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white text-xs font-semibold uppercase tracking-widest hover:border-gold-500 hover:text-gold-400 transition-colors rounded-xl"
          >
            Shop Now <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
