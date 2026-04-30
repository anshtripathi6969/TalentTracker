import type { Candidate } from '../../types';

interface PriorityBadgeProps {
  priority: Candidate['priority_label'];
  large?: boolean;
  className?: string;
}

export function PriorityBadge({ priority, large = false, className = '' }: PriorityBadgeProps) {
  const styles: Record<string, { bg: string; text: string; glow: string; dot: string }> = {
    P0: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', glow: 'shadow-[0_0_12px_rgba(16,185,129,0.3)]', dot: 'bg-emerald-400' },
    P1: { bg: 'bg-amber-500/15', text: 'text-amber-400', glow: 'shadow-[0_0_12px_rgba(245,158,11,0.3)]', dot: 'bg-amber-400' },
    P2: { bg: 'bg-orange-500/15', text: 'text-orange-400', glow: 'shadow-[0_0_12px_rgba(249,115,22,0.3)]', dot: 'bg-orange-400' },
    P3: { bg: 'bg-red-500/15', text: 'text-red-400', glow: 'shadow-[0_0_12px_rgba(239,68,68,0.3)]', dot: 'bg-red-400' },
  };

  const labels: Record<string, string> = {
    P0: 'P0 — Interview Immediately',
    P1: 'P1 — Strong Shortlist',
    P2: 'P2 — Review Later',
    P3: 'P3 — Reject',
  };

  const s = styles[priority];

  if (large) {
    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${s.bg} ${s.text} border border-white/10 ${s.glow} text-[12px] font-semibold tracking-wide backdrop-blur-sm ${className}`}>
        <span className={`w-2 h-2 rounded-full ${s.dot} animate-pulse`} />
        {labels[priority]}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${s.bg} ${s.text} border border-white/5 text-[11px] font-semibold tracking-wide ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {priority}
    </span>
  );
}

export function StatusBadge({ status, className = '' }: { status: string; className?: string }) {
  const config: Record<string, { bg: string; text: string; dot: string }> = {
    pending: { bg: 'bg-slate-500/15', text: 'text-slate-400', dot: 'bg-slate-400' },
    reviewed: { bg: 'bg-violet-500/15', text: 'text-violet-400', dot: 'bg-violet-400' },
    shortlisted: { bg: 'bg-cyan-500/15', text: 'text-cyan-400', dot: 'bg-cyan-400' },
    rejected: { bg: 'bg-red-500/15', text: 'text-red-400', dot: 'bg-red-400' },
  };
  const s = config[status] || config.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${s.bg} ${s.text} border border-white/5 text-[11px] font-semibold capitalize tracking-wide ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}
