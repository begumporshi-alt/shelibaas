'use client';

import { useState } from 'react';
import { Eye, EyeOff, LucideIcon } from 'lucide-react';

type AuthInputProps = {
  label: string;
  icon: LucideIcon;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  revealable?: boolean;
};

export function AuthInput({
  label,
  icon: Icon,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  required = true,
  revealable = false,
}: AuthInputProps) {
  const [show, setShow] = useState(false);
  const inputType = revealable ? (show ? 'text' : 'password') : type;

  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wider text-white/60 mb-2">
        {label}
      </label>
      <div className="relative group">
        <Icon
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-gold-400 transition-colors"
        />
        <input
          type={inputType}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-gold-500/70 focus:ring-2 focus:ring-gold-500/15 focus:bg-white/[0.06] transition-all"
        />
        {revealable && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-label={show ? 'Hide password' : 'Show password'}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35 hover:text-gold-400 transition-colors"
          >
            {show ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </div>
    </div>
  );
}
