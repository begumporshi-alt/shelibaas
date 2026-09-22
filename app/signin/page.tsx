'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';
import { AuthLayout } from '@/components/auth/auth-layout';
import { AuthInput } from '@/components/auth/auth-input';

export default function SignInPage() {
  const router = useRouter();
  const { signIn, user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <AuthLayout
      eyebrow="Welcome Back"
      title="Sign In"
      subtitle="Enter your details to continue shopping."
      footerText="New to Shelibaas?"
      footerLinkHref="/signup"
      footerLinkText="Create an account"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          label="Email Address"
          icon={Mail}
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <AuthInput
          label="Password"
          icon={Lock}
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          autoComplete="current-password"
          revealable
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 bg-gold-500 text-[#0F0A0A] text-sm font-semibold uppercase tracking-widest hover:bg-gold-400 transition-colors disabled:opacity-50 rounded-xl flex items-center justify-center gap-2"
        >
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {submitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="text-[11px] text-center text-white/30 mt-5">
        Admin? Sign in with your admin credentials above.
      </p>
    </AuthLayout>
  );
}
