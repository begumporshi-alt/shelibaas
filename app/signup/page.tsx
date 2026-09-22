'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Loader2, Check } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';
import { AuthLayout } from '@/components/auth/auth-layout';
import { AuthInput } from '@/components/auth/auth-input';
import { cn } from '@/lib/utils';

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, user, loading } = useAuth();
  const [fullName, setFullName] = useState('');
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
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (!fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    setSubmitting(true);
    const { error } = await signUp(email, password, fullName);
    setSubmitting(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success('Account created! Welcome to Shelibaas.');
    router.push('/account');
  };

  const passwordChecks = [
    { label: 'At least 6 characters', pass: password.length >= 6 },
    { label: 'Has a letter', pass: /[a-zA-Z]/.test(password) },
    { label: 'Has a number', pass: /\d/.test(password) },
  ];

  return (
    <AuthLayout
      eyebrow="Join Us"
      title="Create Account"
      subtitle="Join Shelibaas for a personalized experience."
      footerText="Already have an account?"
      footerLinkHref="/signin"
      footerLinkText="Sign in"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          label="Full Name"
          icon={User}
          value={fullName}
          onChange={setFullName}
          placeholder="Your full name"
          autoComplete="name"
        />
        <AuthInput
          label="Email Address"
          icon={Mail}
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <div>
          <AuthInput
            label="Password"
            icon={Lock}
            value={password}
            onChange={setPassword}
            placeholder="Create a password"
            autoComplete="new-password"
            revealable
          />
          {password.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2.5">
              {passwordChecks.map((check) => (
                <div key={check.label} className="flex items-center gap-1.5 text-xs">
                  <span
                    className={cn(
                      'flex items-center justify-center w-4 h-4 rounded-full transition-colors',
                      check.pass ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/30'
                    )}
                  >
                    <Check size={11} />
                  </span>
                  <span className={check.pass ? 'text-emerald-400' : 'text-white/40'}>
                    {check.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 bg-gold-500 text-[#0F0A0A] text-sm font-semibold uppercase tracking-widest hover:bg-gold-400 transition-colors disabled:opacity-50 rounded-xl flex items-center justify-center gap-2"
        >
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {submitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
    </AuthLayout>
  );
}
