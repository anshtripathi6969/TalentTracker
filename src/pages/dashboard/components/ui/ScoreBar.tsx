import { useEffect, useState } from 'react';

interface ScoreBarProps {
  score: number;
  width?: string;
  animate?: boolean;
}

export function ScoreBar({ score, width = 'w-16', animate = true }: ScoreBarProps) {
  const [rendered, setRendered] = useState(animate ? 0 : score);

  useEffect(() => {
    if (!animate) { setRendered(score); return; }
    const t = setTimeout(() => setRendered(score), 100);
    return () => clearTimeout(t);
  }, [score, animate]);

  let gradient = 'from-red-500 to-rose-400';
  let glow = 'rgba(239,68,68,0.4)';
  if (score >= 80) { gradient = 'from-emerald-400 to-cyan-400'; glow = 'rgba(16,185,129,0.5)'; }
  else if (score >= 65) { gradient = 'from-green-400 to-emerald-400'; glow = 'rgba(34,197,94,0.4)'; }
  else if (score >= 50) { gradient = 'from-amber-400 to-yellow-300'; glow = 'rgba(234,179,8,0.4)'; }

  return (
    <div className={`${width} h-[5px] bg-white/10 rounded-full overflow-hidden`}>
      <div
        className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-700 ease-out`}
        style={{ width: `${Math.max(0, Math.min(100, rendered))}%`, boxShadow: rendered > 0 ? `0 0 10px ${glow}` : 'none' }}
      />
    </div>
  );
}
