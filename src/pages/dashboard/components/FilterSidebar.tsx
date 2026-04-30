import React, { useState, useEffect } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import type { AppState } from '../types';
import type { Action } from '../store';
import { PriorityBadge } from './ui/Badge';

interface FilterSidebarProps {
  filters: AppState['filters'];
  dispatch: React.Dispatch<Action>;
  candidates: AppState['candidates'];
}

function ScoreRangeFilter({ label, name, value, dispatch }: { label: string, name: keyof AppState['filters'], value: [number, number], dispatch: React.Dispatch<Action> }) {
  const isActive = value[0] !== 0 || value[1] !== 100;
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${isActive ? 'text-neon-cyan' : 'text-white/30'}`}>{label}</span>
        <span className="text-[11px] font-mono text-white/25">{value[0]}–{value[1]}</span>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
        value={value} max={100} step={1}
        onValueChange={(val) => dispatch({ type: 'SET_SCORE_RANGE', filter: name, payload: val as [number, number] })}
      >
        <Slider.Track className="bg-white/[0.06] relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full h-full shadow-[0_0_8px_rgba(0,240,255,0.3)]" />
        </Slider.Track>
        <Slider.Thumb className="block w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_10px_rgba(176,38,255,0.4)] focus:outline-none focus:ring-[3px] focus:ring-neon-purple/30 cursor-pointer transition-transform duration-200 hover:scale-125" />
        <Slider.Thumb className="block w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_10px_rgba(0,240,255,0.4)] focus:outline-none focus:ring-[3px] focus:ring-neon-cyan/30 cursor-pointer transition-transform duration-200 hover:scale-125" />
      </Slider.Root>
    </div>
  );
}

export function FilterSidebar({ filters, dispatch, candidates }: FilterSidebarProps) {
  const [searchValue, setSearchValue] = useState(filters.search);

  useEffect(() => {
    const t = setTimeout(() => dispatch({ type: 'SET_SEARCH', payload: searchValue }), 200);
    return () => clearTimeout(t);
  }, [searchValue, dispatch]);

  const pCounts = {
    P0: candidates.filter(c => c.priority_label === 'P0').length,
    P1: candidates.filter(c => c.priority_label === 'P1').length,
    P2: candidates.filter(c => c.priority_label === 'P2').length,
    P3: candidates.filter(c => c.priority_label === 'P3').length,
  };

  const activeFiltersCount =
    (filters.search ? 1 : 0) +
    (filters.assignment_range[0] !== 0 || filters.assignment_range[1] !== 100 ? 1 : 0) +
    (filters.video_range[0] !== 0 || filters.video_range[1] !== 100 ? 1 : 0) +
    (filters.ats_range[0] !== 0 || filters.ats_range[1] !== 100 ? 1 : 0) +
    (filters.github_range[0] !== 0 || filters.github_range[1] !== 100 ? 1 : 0) +
    (filters.communication_range[0] !== 0 || filters.communication_range[1] !== 100 ? 1 : 0) +
    (filters.priority.length !== 4 ? 1 : 0) +
    (filters.status.length !== 4 ? 1 : 0);

  return (
    <aside className="w-[260px] bg-dark-800/40 backdrop-blur-md border-r border-white/[0.06] flex flex-col h-full shrink-0 overflow-y-auto dash-scroll">
      {/* Header */}
      <div className="p-4 border-b border-white/[0.06] flex items-center justify-between sticky top-0 bg-dark-800/70 backdrop-blur-xl z-10">
        <h2 className="font-semibold text-white/80 text-[13px] flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-white/30" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="bg-gradient-to-r from-neon-purple to-neon-blue text-white w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(176,38,255,0.4)]">
              {activeFiltersCount}
            </span>
          )}
        </h2>
      </div>

      <div className="p-4 flex flex-col gap-5">
        {/* Search */}
        <div className="relative group">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-neon-cyan transition-colors duration-300" />
          <input
            type="text"
            placeholder="Search name or college..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full h-[36px] pl-9 pr-8 bg-white/[0.04] border border-white/[0.08] rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple/20 focus:border-neon-purple/30 focus:bg-white/[0.06] text-[13px] text-white placeholder:text-white/25 transition-all duration-300"
          />
          {searchValue && (
            <button onClick={() => setSearchValue('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Priority */}
        <div>
          <div className="text-[11px] font-semibold uppercase text-white/30 mb-3 tracking-[0.12em]">Priority</div>
          <div className="flex flex-col gap-1">
            {(['P0', 'P1', 'P2', 'P3'] as const).map(p => (
              <label key={p} className="flex items-center gap-3 cursor-pointer group px-2 py-2 rounded-lg hover:bg-white/[0.04] transition-all duration-200">
                <input
                  type="checkbox"
                  checked={filters.priority.includes(p)}
                  onChange={() => dispatch({ type: 'TOGGLE_PRIORITY_FILTER', payload: p })}
                  className="rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple/30 w-4 h-4 cursor-pointer"
                />
                <PriorityBadge priority={p} />
                <span className="text-[12px] text-white/25 ml-auto font-mono">{pCounts[p]}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <div className="text-[11px] font-semibold uppercase text-white/30 mb-3 tracking-[0.12em]">Review Status</div>
          <div className="flex flex-col gap-1">
            {(['pending', 'reviewed', 'shortlisted', 'rejected'] as const).map(s => {
              const dots: Record<string, string> = {
                pending: 'bg-slate-400', reviewed: 'bg-violet-400', shortlisted: 'bg-cyan-400', rejected: 'bg-red-400',
              };
              return (
                <label key={s} className="flex items-center gap-3 cursor-pointer px-2 py-2 rounded-lg hover:bg-white/[0.04] transition-all duration-200">
                  <input
                    type="checkbox"
                    checked={filters.status.includes(s)}
                    onChange={() => dispatch({ type: 'TOGGLE_STATUS_FILTER', payload: s })}
                    className="rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple/30 w-4 h-4 cursor-pointer"
                  />
                  <span className={`w-2 h-2 rounded-full ${dots[s]}`} />
                  <span className="text-[13px] capitalize text-white/70">{s}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Score Ranges */}
        <div className="pt-4 border-t border-white/[0.06]">
          <ScoreRangeFilter label="Assignment" name="assignment_range" value={filters.assignment_range} dispatch={dispatch} />
          <ScoreRangeFilter label="Video" name="video_range" value={filters.video_range} dispatch={dispatch} />
          <ScoreRangeFilter label="ATS" name="ats_range" value={filters.ats_range} dispatch={dispatch} />
          <ScoreRangeFilter label="GitHub" name="github_range" value={filters.github_range} dispatch={dispatch} />
          <ScoreRangeFilter label="Communication" name="communication_range" value={filters.communication_range} dispatch={dispatch} />
        </div>
      </div>

      {/* Reset */}
      <div className="mt-auto p-4 border-t border-white/[0.06] sticky bottom-0 bg-dark-800/70 backdrop-blur-xl z-10">
        <button
          onClick={() => { setSearchValue(''); dispatch({ type: 'RESET_FILTERS' }); }}
          className="flex items-center justify-center gap-2 w-full text-white/40 hover:text-neon-cyan text-[13px] font-medium py-2 rounded-lg hover:bg-white/[0.04] transition-all duration-300"
        >
          <RotateCcw size={14} />
          Reset All Filters
        </button>
      </div>
    </aside>
  );
}
