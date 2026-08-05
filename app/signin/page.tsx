'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

export default function SignInPage() {
  const router = useRouter();
  const { signIn, user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Redirect already-logged-in users
  useEffect(() => {
    if (!loading && user) {
      router.replace('/account');
    }
  }, [user, loading, router]);

  if (loading || user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      toast.error('Invalid email or password. Please try again.');
      return;
    }
    toast.success('Welcome back!');
    router.push('/account');
  };

  return (
    <div className="min-h-screen flex">
      {/* Image side */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.pexels.com/photos/14284143/pexels-photo-14284143.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="The Libaas Gallery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-12">
          <div className="relative w-28 h-28 drop-shadow-2xl">
            <Image src="/Libaas_logo.png" alt="The Libaas Gallery" fill className="object-contain" />
          </div>
          <div className="text-center">
            <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-2">Welcome Back</p>
            <h2 className="font-serif text-4xl text-libaas-600 leading-tight">
              The Libaas <span className="italic text-gold-400">Gallery</span>
            </h2>
            <p className="text-white/60 text-sm mt-3 max-w-xs">
              Your destination for handpicked designer wear, curated with intention.
            </p>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-28 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <div className="relative w-16 h-16">
              <Image src="/Libaas_logo.png" alt="The Libaas Gallery" fill className="object-contain" />
            </div>
          </div>

          <h1 className="font-serif text-3xl mb-1">Sign In</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Welcome back. Enter your details to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-colors bg-background"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium">Password</label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full border border-border rounded-lg px-4 py-3 pr-11 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-colors bg-background"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-ink-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-gold-500 transition-colors disabled:opacity-50 rounded-lg"
            >
              {submitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              New to The Libaas Gallery?{' '}
              <Link href="/signup" className="text-gold-600 font-medium hover:underline">
                Create an account
              </Link>
            </p>
          </div>

          {/* Admin hint */}
          <p className="text-xs text-center text-muted-foreground/50 mt-4">
            Admin? Sign in with your admin credentials above.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
