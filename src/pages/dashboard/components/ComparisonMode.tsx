import React from 'react';
import { X, Trophy, TrendingUp, ChevronRight } from 'lucide-react';
import type { AppState, Candidate } from '../types';
import type { Action } from '../store';
import { Button } from './ui/Button';
import { PriorityBadge, StatusBadge } from './ui/Badge';
import { ScoreBar } from './ui/ScoreBar';

export function ComparisonBar({ state, dispatch }: { state: AppState, dispatch: React.Dispatch<Action> }) {
  if (state.comparison_ids.length === 0) return null;
  const compared = state.comparison_ids.map(id => state.candidates.find(c => c.id === id)).filter(Boolean) as Candidate[];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[68px] bg-dark-800/80 backdrop-blur-xl border-t border-white/[0.06] shadow-[0_-8px_30px_rgba(0,0,0,0.3)] flex items-center justify-between px-8 z-40 animate-fade-in">
      <div className="flex items-center gap-4">
        <span className="text-[12px] font-semibold uppercase text-white/30 tracking-[0.12em] flex items-center gap-2">
          <TrendingUp size={15} className="text-neon-cyan" /> Comparing
        </span>
        <div className="flex gap-2">
          {compared.map(c => (
            <div key={c.id} className="bg-neon-purple/10 border border-neon-purple/20 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-[0_0_10px_rgba(176,38,255,0.1)]">
              <span className="text-[13px] font-semibold text-neon-cyan">{c.name}</span>
              <button onClick={() => dispatch({ type: 'REMOVE_FROM_COMPARISON', id: c.id })} className="text-white/20 hover:text-red-400 transition-colors"><X size={14} /></button>
            </div>
          ))}
          {compared.length < 3 && (
            <div className="border border-dashed border-white/15 px-3 py-1.5 rounded-lg text-[13px] text-white/20">+ Add {3 - compared.length} more</div>
          )}
        </div>
      </div>
      <Button onClick={() => dispatch({ type: 'SET_COMPARISON_MODAL', payload: true })} size="large">
        Compare Now <ChevronRight size={16} />
      </Button>
    </div>
  );
}

export function ComparisonModal({ state, dispatch }: { state: AppState, dispatch: React.Dispatch<Action> }) {
  if (!state.comparison_modal_open) return null;
  const compared = state.comparison_ids.map(id => state.candidates.find(c => c.id === id)).filter(Boolean) as Candidate[];

  const getMax = (key: string) => Math.max(...compared.map(c => {
    switch(key) {
      case 'assignment': return c.score_overrides.assignment_score ?? c.assignment_score;
      case 'video': return c.score_overrides.video_score ?? c.video_score;
      case 'ats': return c.score_overrides.ats_score ?? c.ats_score;
      case 'github': return c.score_overrides.github_score ?? c.github_score;
      case 'communication': return c.score_overrides.communication_score ?? c.communication_score;
      case 'priority': return c.priority_score;
      default: return 0;
    }
  }));

  const maxVals = { assignment: getMax('assignment'), video: getMax('video'), ats: getMax('ats'), github: getMax('github'), communication: getMax('communication'), priority: getMax('priority') };

  const scoreRows = [
    { label: 'Assignment', key: 'assignment', getVal: (c: Candidate) => c.score_overrides.assignment_score ?? c.assignment_score },
    { label: 'Video', key: 'video', getVal: (c: Candidate) => c.score_overrides.video_score ?? c.video_score },
    { label: 'ATS', key: 'ats', getVal: (c: Candidate) => c.score_overrides.ats_score ?? c.ats_score },
    { label: 'GitHub', key: 'github', getVal: (c: Candidate) => c.score_overrides.github_score ?? c.github_score },
    { label: 'Communication', key: 'communication', getVal: (c: Candidate) => c.score_overrides.communication_score ?? c.communication_score },
  ];

  const cols = `180px repeat(${Math.max(compared.length, 1)}, 1fr)${compared.length < 3 ? ` repeat(${3 - compared.length}, 1fr)` : ''}`;

  return (
    <div className="fixed inset-0 bg-dark-900 z-50 flex flex-col animate-fade-in">
      <div className="h-[64px] border-b border-white/[0.06] flex items-center justify-between px-8 shrink-0 bg-dark-800/60 backdrop-blur-xl">
        <h2 className="text-[18px] font-bold text-white flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-neon-purple/20 to-neon-blue/20 rounded-lg flex items-center justify-center border border-white/10">
            <TrendingUp size={18} className="text-neon-cyan" />
          </div>
          Candidate Comparison
        </h2>
        <button onClick={() => dispatch({ type: 'SET_COMPARISON_MODAL', payload: false })} className="text-white/30 hover:text-white/80 p-2 hover:bg-white/[0.06] rounded-lg transition-all duration-200">
          <X size={22} />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-8 dash-scroll">
        <div className="max-w-[1200px] mx-auto">
          {/* Headers */}
          <div className="grid gap-4" style={{ gridTemplateColumns: cols }}>
            <div />
            {compared.map(c => {
              const isBest = c.priority_score === maxVals.priority;
              return (
                <div key={c.id} className={`bg-white/[0.03] backdrop-blur-sm rounded-xl border ${isBest ? 'border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-white/[0.06]'} p-5 relative`}>
                  {isBest && (
                    <div className="absolute -top-3 left-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-[0_0_12px_rgba(16,185,129,0.4)]">
                      <Trophy size={10} /> TOP PICK
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 flex items-center justify-center text-neon-cyan font-bold text-[15px] border border-white/10">{c.name.charAt(0)}</div>
                    <div>
                      <div className="text-[15px] font-bold text-white">{c.name}</div>
                      <div className="text-[12px] text-white/30">{c.college}</div>
                    </div>
                  </div>
                  <div className="flex gap-2"><PriorityBadge priority={c.priority_label} /><StatusBadge status={c.status} /></div>
                </div>
              );
            })}
            {Array.from({ length: 3 - compared.length }).map((_, i) => (
              <div key={`e-${i}`} className="rounded-xl border-2 border-dashed border-white/10 p-5 flex items-center justify-center text-[13px] text-white/20 min-h-[120px]">Select a candidate</div>
            ))}
          </div>

          {/* Scores */}
          <div className="mt-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/25 mb-3 flex items-center gap-2 px-1">
              <div className="w-1 h-4 bg-gradient-to-b from-neon-purple to-neon-blue rounded-full" /> Score Comparison
            </div>
            <div className="bg-white/[0.02] rounded-xl border border-white/[0.06] overflow-hidden">
              {scoreRows.map((row, idx) => (
                <div key={row.key} className={`grid gap-4 px-5 py-4 ${idx !== scoreRows.length - 1 ? 'border-b border-white/[0.04]' : ''} hover:bg-white/[0.02] transition-colors`} style={{ gridTemplateColumns: cols }}>
                  <div className="text-[13px] font-semibold text-white/50 flex items-center">{row.label}</div>
                  {compared.map(c => {
                    const val = row.getVal(c);
                    const isMax = val === maxVals[row.key as keyof typeof maxVals];
                    return (
                      <div key={c.id} className="flex items-center gap-3">
                        <span className={`font-mono text-[16px] w-8 text-right ${isMax ? 'font-bold text-emerald-400' : 'font-medium text-white/50'}`}>{val}</span>
                        <ScoreBar score={val} width="flex-1" animate={false} />
                        {isMax && <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.5)] shrink-0" />}
                      </div>
                    );
                  })}
                  {Array.from({ length: 3 - compared.length }).map((_, i) => <div key={i} className="text-white/15">—</div>)}
                </div>
              ))}
            </div>
          </div>

          {/* Priority + Actions */}
          <div className="mt-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/25 mb-3 flex items-center gap-2 px-1">
              <div className="w-1 h-4 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full" /> Priority & Actions
            </div>
            <div className="grid gap-4" style={{ gridTemplateColumns: cols }}>
              <div />
              {compared.map(c => {
                const isBest = c.priority_score === maxVals.priority;
                return (
                  <div key={c.id} className={`bg-white/[0.03] rounded-xl border ${isBest ? 'border-emerald-500/20' : 'border-white/[0.06]'} p-5 text-center`}>
                    <div className={`font-mono text-[34px] font-bold mb-2 ${isBest ? 'text-emerald-400' : 'text-white'}`}>{c.priority_score.toFixed(1)}</div>
                    <PriorityBadge priority={c.priority_label} large className="mb-4" />
                    <Button variant={c.status === 'shortlisted' ? 'secondary' : 'primary'} className="w-full mt-3" onClick={() => dispatch({ type: 'UPDATE_CANDIDATE_STATUS', id: c.id, payload: c.status === 'shortlisted' ? 'pending' : 'shortlisted' })}>
                      {c.status === 'shortlisted' ? 'Remove from Shortlist' : 'Shortlist Candidate'}
                    </Button>
                  </div>
                );
              })}
              {Array.from({ length: 3 - compared.length }).map((_, i) => <div key={i} className="rounded-xl border-2 border-dashed border-white/10 p-5 min-h-[150px]" />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
