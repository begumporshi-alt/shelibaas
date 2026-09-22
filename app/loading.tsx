import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#0F0A0A]">
      <Loader2 size={28} className="animate-spin text-gold-400" />
      <p className="text-white/40 text-xs uppercase tracking-[0.3em]">Loading Shelibaas</p>
    </div>
  );
}
