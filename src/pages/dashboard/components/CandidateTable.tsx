import React from 'react';
import { ArrowUp, ArrowDown, Square, CheckSquare, FilterX, Star } from 'lucide-react';
import type { AppState, Candidate } from '../types';
import type { Action } from '../store';
import { ScoreBar } from './ui/ScoreBar';
import { PriorityBadge, StatusBadge } from './ui/Badge';

interface CandidateTableProps {
  candidates: Candidate[];
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export function CandidateTable({ candidates, state, dispatch }: CandidateTableProps) {
  const { sort_by, sort_direction, page, page_size, comparison_ids, active_candidate_id } = state;
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const SortIcon = ({ column }: { column: keyof Candidate }) => {
    if (sort_by !== column) return <span className="inline-block w-3 ml-1 opacity-0 group-hover:opacity-30"><ArrowDown size={10} /></span>;
    return sort_direction === 'asc'
      ? <ArrowUp size={12} className="inline ml-1 text-neon-cyan" />
      : <ArrowDown size={12} className="inline ml-1 text-neon-cyan" />;
  };

  const headers = [
    { label: '#', width: 'w-[44px]', sortable: false },
    { label: 'Name', width: 'min-w-[200px]', sortable: true, key: 'name' as keyof Candidate },
    { label: 'ATS', width: 'w-[120px]', sortable: true, key: 'ats_score' as keyof Candidate },
    { label: 'Assignment', width: 'w-[130px]', sortable: true, key: 'assignment_score' as keyof Candidate },
    { label: 'Video', width: 'w-[120px]', sortable: true, key: 'video_score' as keyof Candidate },
    { label: 'GitHub', width: 'w-[90px]', sortable: true, key: 'github_score' as keyof Candidate },
    { label: 'Comm.', width: 'w-[90px]', sortable: true, key: 'communication_score' as keyof Candidate },
    { label: 'Priority', width: 'w-[100px]', sortable: true, key: 'priority_score' as keyof Candidate },
    { label: 'Status', width: 'w-[110px]', sortable: false },
    { label: 'Actions', width: 'w-[90px]', sortable: false },
  ];

  if (candidates.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-16 text-center">
        <div className="w-16 h-16 bg-white/[0.04] rounded-2xl flex items-center justify-center mb-5 border border-white/[0.06]">
          <FilterX size={28} className="text-white/20" />
        </div>
        <h3 className="text-[16px] font-semibold text-white/80 mb-2">No candidates match</h3>
        <p className="text-[13px] text-white/40 mb-5 max-w-xs">Try adjusting the score ranges or priority levels.</p>
        <button
          onClick={() => dispatch({ type: 'RESET_FILTERS' })}
          className="text-neon-cyan hover:text-neon-blue font-semibold bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 px-5 py-2.5 rounded-lg transition-all duration-300"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  const startIdx = (page - 1) * page_size;
  const endIdx = startIdx + page_size;
  const currentCandidates = candidates.slice(startIdx, endIdx);
  const totalPages = Math.ceil(candidates.length / page_size);

  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      {/* Toast */}
      {errorMsg && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2.5 rounded-lg backdrop-blur-md z-50 text-[13px] font-medium animate-fade-in flex items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
          {errorMsg}
        </div>
      )}

      {/* Table */}
      <div className="flex-1 overflow-auto dash-scroll">
        <table className="w-full border-collapse text-left min-w-[1100px]">
          <thead className="sticky top-0 bg-dark-900/80 backdrop-blur-xl z-10">
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className={`${h.width} py-3 px-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/30 border-b border-white/[0.06] ${h.sortable ? 'cursor-pointer hover:text-white/60 select-none group transition-colors duration-200' : ''}`}
                  onClick={() => h.sortable && h.key && dispatch({ type: 'SET_SORT', payload: h.key })}
                >
                  <span className="flex items-center">
                    {h.label} {h.sortable && h.key && <SortIcon column={h.key} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentCandidates.map((c, i) => {
              const globalIdx = startIdx + i + 1;
              const isSelected = active_candidate_id === c.id;
              const isCompared = comparison_ids.includes(c.id);
              const isShortlisted = c.status === 'shortlisted';

              return (
                <tr
                  key={c.id}
                  className={`h-[56px] border-b border-white/[0.04] cursor-pointer transition-all duration-200
                    ${isSelected
                      ? 'bg-neon-purple/[0.08] border-l-[3px] border-l-neon-purple shadow-[inset_0_0_30px_rgba(176,38,255,0.05)]'
                      : 'bg-transparent hover:bg-white/[0.03] border-l-[3px] border-l-transparent'}
                  `}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest('.actions-cell')) return;
                    dispatch({ type: 'OPEN_DRAWER', payload: c.id });
                  }}
                >
                  <td className="px-4 py-3 text-[12px] text-white/20 font-mono">{globalIdx}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 flex items-center justify-center text-[13px] font-bold text-white/60 border border-white/10 shrink-0">
                        {c.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-white/90 text-[13px] truncate">{c.name}</div>
                        <div className="text-[11px] text-white/30 truncate">{c.college}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-semibold text-[13px] text-white/80 w-6 text-right">{c.ats_score}</span>
                      <ScoreBar score={c.ats_score} />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-semibold text-[13px] text-white/80 w-6 text-right">{c.score_overrides.assignment_score ?? c.assignment_score}</span>
                      <ScoreBar score={c.score_overrides.assignment_score ?? c.assignment_score} />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-semibold text-[13px] text-white/80 w-6 text-right">{c.score_overrides.video_score ?? c.video_score}</span>
                      <ScoreBar score={c.score_overrides.video_score ?? c.video_score} />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono font-semibold text-[13px] text-white/80">{c.github_score}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono font-semibold text-[13px] text-white/80">{c.communication_score}</span>
                  </td>
                  <td className="px-4 py-3"><PriorityBadge priority={c.priority_label} /></td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3 actions-cell" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_CANDIDATE_STATUS', id: c.id, payload: isShortlisted ? 'pending' : 'shortlisted' })}
                        className={`p-2 rounded-lg transition-all duration-200 ${isShortlisted ? 'text-amber-400 bg-amber-500/10 shadow-[0_0_10px_rgba(245,158,11,0.15)]' : 'text-white/20 hover:text-amber-400 hover:bg-amber-500/10'}`}
                        title={isShortlisted ? "Remove from shortlist" : "Shortlist"}
                      >
                        <Star size={15} className={isShortlisted ? 'fill-current' : ''} />
                      </button>
                      <button
                        onClick={() => {
                          if (!isCompared && comparison_ids.length >= 3) {
                            setErrorMsg('Max 3 candidates for comparison');
                            setTimeout(() => setErrorMsg(null), 3000);
                            return;
                          }
                          dispatch({ type: 'TOGGLE_COMPARISON', id: c.id });
                        }}
                        className={`p-2 rounded-lg transition-all duration-200 ${isCompared ? 'text-neon-cyan bg-neon-cyan/10 shadow-[0_0_10px_rgba(0,240,255,0.15)]' : 'text-white/20 hover:text-neon-cyan hover:bg-neon-cyan/10'}`}
                        title="Compare"
                      >
                        {isCompared ? <CheckSquare size={15} /> : <Square size={15} />}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="h-[52px] bg-dark-800/50 backdrop-blur-md border-t border-white/[0.06] flex items-center justify-between px-6 shrink-0">
        <div className="text-[13px] text-white/30">
          Showing <span className="font-semibold text-white/60">{startIdx + 1}–{Math.min(endIdx, candidates.length)}</span> of <span className="font-semibold text-white/60">{candidates.length}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            disabled={page === 1}
            onClick={() => dispatch({ type: 'SET_PAGE', payload: page - 1 })}
            className="h-8 px-3 text-[13px] font-medium text-white/40 hover:text-neon-cyan hover:bg-white/[0.04] disabled:text-white/15 disabled:pointer-events-none rounded-lg transition-all duration-200"
          >← Prev</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
            .map((p, idx, arr) => (
              <React.Fragment key={p}>
                {idx > 0 && arr[idx - 1] !== p - 1 && <span className="text-white/20 text-[13px] px-1">…</span>}
                <button
                  onClick={() => dispatch({ type: 'SET_PAGE', payload: p })}
                  className={`w-8 h-8 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                    p === page
                      ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-[0_0_14px_rgba(176,38,255,0.35)]'
                      : 'text-white/40 hover:bg-white/[0.06] hover:text-white/70'
                  }`}
                >{p}</button>
              </React.Fragment>
            ))}
          <button
            disabled={page === totalPages}
            onClick={() => dispatch({ type: 'SET_PAGE', payload: page + 1 })}
            className="h-8 px-3 text-[13px] font-medium text-white/40 hover:text-neon-cyan hover:bg-white/[0.04] disabled:text-white/15 disabled:pointer-events-none rounded-lg transition-all duration-200"
          >Next →</button>
        </div>
      </div>
    </div>
  );
}
