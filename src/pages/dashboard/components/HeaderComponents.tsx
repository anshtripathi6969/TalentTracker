import React, { useEffect } from 'react';
import { Users, CheckCircle, Star, Clock, ChevronDown, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { AppState } from '../types';

export function TopBar({ shortlist_only, toggleShortlist }: { shortlist_only: boolean, toggleShortlist: () => void }) {
  return (
    <header className="h-[60px] bg-dark-800/60 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-6 shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-all duration-300 group" title="Back to Home">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
          </div>
        </Link>
        <div className="w-px h-7 bg-white/10" />
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-neon-purple to-neon-blue flex items-center justify-center shadow-[0_0_20px_rgba(176,38,255,0.4)]">
            <span className="text-white font-bold text-sm leading-none">T</span>
          </div>
          <h1 className="text-[17px] tracking-tight font-outfit">
            <span className="font-bold text-white">Talent</span>
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan">Tracker</span>
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <label className="flex items-center gap-2.5 cursor-pointer select-none group">
          <div
            className={`relative w-10 h-[22px] rounded-full transition-all duration-300 border ${shortlist_only ? 'bg-neon-purple/30 border-neon-purple/50 shadow-[0_0_12px_rgba(176,38,255,0.3)]' : 'bg-white/5 border-white/10'}`}
            onClick={toggleShortlist}
          >
            <div className={`absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-all duration-300 ${shortlist_only ? 'translate-x-[20px]' : 'translate-x-[2px]'}`} />
          </div>
          <span className="text-[13px] font-medium text-white/50 group-hover:text-white/80 transition-colors duration-300">Shortlisted Only</span>
        </label>
        <div className="w-px h-7 bg-white/10" />
        <div className="flex items-center gap-3 hover:bg-white/5 cursor-pointer p-2 -my-2 rounded-xl transition-all duration-300 group">
          <div className="flex flex-col items-end">
            <span className="text-[13px] font-semibold text-white leading-tight">Ansh Tripathi</span>
            <span className="text-[11px] text-white/40 font-medium">Recruiting Lead</span>
          </div>
          <div className="relative">
            <img
              src="https://api.dicebear.com/7.x/notionists/svg?seed=AnshTripathi&backgroundColor=1a1b2e"
              alt="Ansh Tripathi"
              className="w-9 h-9 rounded-full border-2 border-white/10 shadow-[0_0_12px_rgba(0,0,0,0.3)]"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-dark-800 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
          </div>
          <ChevronDown size={14} className="text-white/30 group-hover:text-white/60 transition-colors duration-300" />
        </div>
      </div>
    </header>
  );
}

interface KPICardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  sublabel: string;
  gradient: string;
  glow: string;
  delay: number;
}

function KPICard({ label, value, icon, sublabel, gradient, glow, delay }: KPICardProps) {
  const [count, setCount] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), delay);
    const t2 = setTimeout(() => {
      const dur = 1200;
      const start = Date.now();
      const anim = () => {
        const e = Date.now() - start;
        const p = Math.min(e / dur, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        setCount(Math.round(eased * value));
        if (p < 1) requestAnimationFrame(anim);
      };
      requestAnimationFrame(anim);
    }, delay + 200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [value, delay]);

  return (
    <div
      className={`relative overflow-hidden rounded-xl p-5 flex-1 flex flex-col justify-between border border-white/[0.06] bg-white/[0.03] backdrop-blur-md transition-all duration-700 hover:bg-white/[0.06] hover:border-white/[0.12] hover:-translate-y-1 group cursor-default ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Accent glow */}
      <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${gradient}`} />
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradient}`} />

      <div className="flex items-center gap-2 mb-3 relative z-10">
        <div className={`${glow}`}>{icon}</div>
        <span className="text-[11px] uppercase font-semibold tracking-[0.12em] text-white/40">{label}</span>
      </div>
      <div className="text-[34px] font-bold text-white font-mono leading-none tracking-tight relative z-10">{count}</div>
      <div className="text-[12px] text-white/30 mt-2 relative z-10">{sublabel}</div>
    </div>
  );
}

export function SummaryPanel({ candidates }: { candidates: AppState['candidates'] }) {
  const total = candidates.length;
  const reviewed = candidates.filter(c => c.status !== 'pending').length;
  const shortlisted = candidates.filter(c => c.status === 'shortlisted').length;
  const pending = candidates.filter(c => c.status === 'pending').length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-dark-900/40 border-b border-white/[0.06] shrink-0 relative">
      {/* Subtle background mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(176,38,255,0.05),transparent_60%)]" />
      <KPICard label="Total Candidates" value={total} icon={<Users size={16} />} sublabel="In current dataset" gradient="from-neon-purple to-neon-blue" glow="text-neon-purple" delay={0} />
      <KPICard label="Reviewed" value={reviewed} icon={<CheckCircle size={16} />} sublabel={`${Math.round((reviewed / total) * 100 || 0)}% of total`} gradient="from-violet-500 to-purple-500" glow="text-violet-400" delay={100} />
      <KPICard label="Shortlisted" value={shortlisted} icon={<Star size={16} />} sublabel={`${Math.round((shortlisted / reviewed) * 100 || 0)}% of reviewed`} gradient="from-neon-cyan to-emerald-400" glow="text-neon-cyan" delay={200} />
      <KPICard label="Pending" value={pending} icon={<Clock size={16} />} sublabel={`${total - reviewed} remaining`} gradient="from-amber-400 to-orange-500" glow="text-amber-400" delay={300} />
    </div>
  );
}
