import React from 'react';
import { X, Star, Trash2 } from 'lucide-react';
import type { AppState, Candidate } from '../types';
import type { Action } from '../store';
import { PriorityBadge } from './ui/Badge';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import * as Slider from '@radix-ui/react-slider';

interface CandidateDrawerProps {
  candidate: Candidate | null;
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export function CandidateDrawer({ candidate, state, dispatch }: CandidateDrawerProps) {
  if (!candidate) return null;
  const { active_tab } = state;
  const isShortlisted = candidate.status === 'shortlisted';

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in" onClick={() => dispatch({ type: 'CLOSE_DRAWER' })} />
      <div className="fixed right-0 top-0 bottom-0 w-[540px] bg-dark-900/95 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.5)] z-50 flex flex-col animate-slide-in border-l border-white/[0.06]">

        {/* Header */}
        <div className="p-6 border-b border-white/[0.06] shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-neon-blue/5" />
          <div className="relative flex items-start justify-between">
            <div className="flex gap-4 items-start">
              <button onClick={() => dispatch({ type: 'CLOSE_DRAWER' })} className="mt-1 text-white/30 hover:text-white/80 p-1 hover:bg-white/[0.06] rounded-lg transition-all duration-200">
                <X size={20} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 flex items-center justify-center text-neon-cyan font-bold text-[18px] border border-white/10 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                  {candidate.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-[18px] font-bold text-white">{candidate.name}</h2>
                  <div className="text-[13px] text-white/40 mt-0.5">{candidate.college} · <span className="capitalize">{candidate.status}</span></div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant={candidate.status === 'rejected' ? 'secondary' : 'destructive'} size="compact" onClick={() => dispatch({ type: 'UPDATE_CANDIDATE_STATUS', id: candidate.id, payload: candidate.status === 'rejected' ? 'pending' : 'rejected' })}>
                {candidate.status === 'rejected' ? 'Undo' : 'Reject'}
              </Button>
              <Button variant={isShortlisted ? 'secondary' : 'primary'} size="compact" onClick={() => dispatch({ type: 'UPDATE_CANDIDATE_STATUS', id: candidate.id, payload: isShortlisted ? 'pending' : 'shortlisted' })}>
                {isShortlisted ? 'Remove' : 'Shortlist'}
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/[0.06] px-6 shrink-0">
          {(['overview', 'assignment', 'video'] as const).map(tab => (
            <button key={tab} onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab })}
              className={`px-5 py-3.5 text-[13px] font-semibold capitalize border-b-2 transition-all duration-300
                ${active_tab === tab ? 'border-neon-cyan text-neon-cyan' : 'border-transparent text-white/30 hover:text-white/60 hover:border-white/10'}
              `}>{tab}</button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 dash-scroll">
          {active_tab === 'overview' && <OverviewTab candidate={candidate} dispatch={dispatch} />}
          {active_tab === 'assignment' && <AssignmentTab candidate={candidate} dispatch={dispatch} />}
          {active_tab === 'video' && <VideoTab candidate={candidate} dispatch={dispatch} />}
        </div>
      </div>
    </>
  );
}

function OverviewScoreItem({ label, score, onOverride }: { label: string; score: number; onOverride: (val: number | undefined) => void }) {
  const [val, setVal] = React.useState(score.toString());
  React.useEffect(() => { setVal(score.toString()); }, [score]);

  const handleBlur = () => {
    let num = parseInt(val, 10);
    if (isNaN(num)) num = score;
    num = Math.max(0, Math.min(100, num));
    setVal(num.toString());
    onOverride(num);
  };

  let barGrad = 'from-red-500 to-rose-400';
  if (score >= 80) barGrad = 'from-emerald-400 to-cyan-400';
  else if (score >= 65) barGrad = 'from-green-400 to-emerald-400';
  else if (score >= 50) barGrad = 'from-amber-400 to-yellow-300';

  return (
    <div className="bg-white/[0.03] rounded-xl border border-white/[0.06] p-4 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300 group">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[11px] font-semibold uppercase text-white/30 tracking-[0.1em] group-hover:text-white/50 transition-colors">{label}</span>
        <input type="number" value={val} onChange={(e) => setVal(e.target.value)} onBlur={handleBlur}
          className="w-[52px] h-[28px] text-right font-mono text-[15px] font-bold text-white bg-transparent border border-transparent hover:border-white/10 focus:border-neon-purple/50 focus:outline-none focus:ring-1 focus:ring-neon-purple/20 rounded-lg px-1.5 transition-all duration-200"
        />
      </div>
      <div className="w-full h-[6px] bg-white/[0.06] rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${barGrad} rounded-full transition-all duration-500 ease-out`} style={{ width: `${Math.max(0, Math.min(100, score))}%` }} />
      </div>
    </div>
  );
}

function OverviewTab({ candidate, dispatch }: { candidate: Candidate, dispatch: React.Dispatch<Action> }) {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/30 mb-4 flex items-center gap-2">
          <div className="w-1 h-4 bg-gradient-to-b from-neon-purple to-neon-blue rounded-full" /> Scores
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <OverviewScoreItem label="ATS Score" score={candidate.score_overrides.ats_score ?? candidate.ats_score} onOverride={(v) => dispatch({ type: 'UPDATE_SCORE_OVERRIDE', id: candidate.id, field: 'ats_score', value: v })} />
          <OverviewScoreItem label="Assignment" score={candidate.score_overrides.assignment_score ?? candidate.assignment_score} onOverride={(v) => dispatch({ type: 'UPDATE_SCORE_OVERRIDE', id: candidate.id, field: 'assignment_score', value: v })} />
          <OverviewScoreItem label="Video" score={candidate.score_overrides.video_score ?? candidate.video_score} onOverride={(v) => dispatch({ type: 'UPDATE_SCORE_OVERRIDE', id: candidate.id, field: 'video_score', value: v })} />
          <OverviewScoreItem label="GitHub" score={candidate.score_overrides.github_score ?? candidate.github_score} onOverride={(v) => dispatch({ type: 'UPDATE_SCORE_OVERRIDE', id: candidate.id, field: 'github_score', value: v })} />
          <div className="col-span-2">
            <OverviewScoreItem label="Communication" score={candidate.score_overrides.communication_score ?? candidate.communication_score} onOverride={(v) => dispatch({ type: 'UPDATE_SCORE_OVERRIDE', id: candidate.id, field: 'communication_score', value: v })} />
          </div>
        </div>
      </section>

      <section className="bg-white/[0.03] rounded-xl border border-white/[0.06] p-5 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-3xl bg-neon-purple/10" />
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/30 mb-4 flex items-center gap-2 relative z-10">
          <div className="w-1 h-4 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full" /> Priority Score
        </h3>
        <div className="flex items-center gap-4 mb-4 relative z-10">
          <div className="text-[38px] font-bold font-mono text-white leading-none tracking-tighter">{candidate.priority_score.toFixed(1)}</div>
          <PriorityBadge priority={candidate.priority_label} large />
        </div>
        <div className="pt-4 border-t border-white/[0.06] text-[12px] text-white/25 flex flex-wrap gap-x-4 gap-y-1 relative z-10">
          <span>Assignment <strong className="text-white/50">30%</strong></span>
          <span>Video <strong className="text-white/50">25%</strong></span>
          <span>ATS <strong className="text-white/50">20%</strong></span>
          <span>GitHub <strong className="text-white/50">15%</strong></span>
          <span>Comm. <strong className="text-white/50">10%</strong></span>
        </div>
      </section>

      <section>
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/30 mb-4 flex items-center gap-2">
          <div className="w-1 h-4 bg-gradient-to-b from-violet-400 to-purple-400 rounded-full" /> Reviewer Notes
        </h3>
        <textarea
          className="w-full min-h-[100px] bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 text-[13px] text-white/80 focus:outline-none focus:ring-2 focus:ring-neon-purple/20 focus:border-neon-purple/30 resize-y transition-all duration-200 placeholder:text-white/20"
          placeholder="Add internal notes about this candidate..."
          value={candidate.reviewer_notes}
          onChange={(e) => dispatch({ type: 'UPDATE_REVIEWER_NOTES', id: candidate.id, payload: e.target.value })}
        />
      </section>
    </div>
  );
}

function RubricSliderRow({ label, description, value, onChange }: { label: string; description: string; value: number; onChange: (val: number) => void }) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-semibold text-white/80 text-[14px]">{label}</div>
          <div className="text-[12px] text-white/30 mt-0.5">{description}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[15px] font-mono font-bold text-white bg-white/[0.06] px-2 py-0.5 rounded-md">{value}</div>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} size={14}
                className={`transition-all duration-200 cursor-pointer ${i <= value ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.4)]' : 'text-white/15 hover:text-amber-400/40'}`}
                onClick={() => onChange(i === value ? 0 : i)}
              />
            ))}
          </div>
        </div>
      </div>
      <Slider.Root className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer" value={[value]} min={0} max={5} step={1} onValueChange={(val) => onChange(val[0])}>
        <Slider.Track className="bg-white/[0.06] relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-gradient-to-r from-amber-400 to-amber-500 rounded-full h-full shadow-[0_0_8px_rgba(245,158,11,0.3)]" />
        </Slider.Track>
        <Slider.Thumb className="block w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_10px_rgba(245,158,11,0.4)] focus:outline-none focus:ring-[3px] focus:ring-amber-400/20 cursor-pointer transition-transform duration-200 hover:scale-125" />
      </Slider.Root>
      <div className="flex justify-between text-[10px] text-white/15 mt-1.5 font-mono px-0.5">
        <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
      </div>
    </div>
  );
}

function AssignmentTab({ candidate, dispatch }: { candidate: Candidate, dispatch: React.Dispatch<Action> }) {
  const criteria = [
    { key: 'ui_quality', label: 'UI Quality', desc: 'Visual polish, spacing, consistency' },
    { key: 'component_structure', label: 'Component Structure', desc: 'How components are decomposed and reused' },
    { key: 'state_handling', label: 'State Handling', desc: 'useState, useEffect, derived state clarity' },
    { key: 'edge_case_handling', label: 'Edge-case Handling', desc: 'Empty states, loading, error conditions' },
    { key: 'responsiveness', label: 'Responsiveness', desc: 'Mobile layout behavior' },
    { key: 'accessibility', label: 'Accessibility', desc: 'ARIA, keyboard nav, color contrast' },
  ] as const;

  const rubric = candidate.assignment_rubric || { ui_quality: 0, component_structure: 0, state_handling: 0, edge_case_handling: 0, responsiveness: 0, accessibility: 0 };

  return (
    <div>
      <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/30 mb-4 flex items-center gap-2">
        <div className="w-1 h-4 bg-gradient-to-b from-neon-purple to-neon-blue rounded-full" /> Assignment Evaluation
      </h3>
      <div className="flex flex-col gap-3">
        {criteria.map(c => (
          <RubricSliderRow key={c.key} label={c.label} description={c.desc} value={rubric[c.key]} onChange={(val) => dispatch({ type: 'UPDATE_ASSIGNMENT_RUBRIC', id: candidate.id, field: c.key, value: val })} />
        ))}
      </div>
      {candidate.assignment_rubric && (
        <div className="mt-5 p-4 bg-neon-purple/10 border border-neon-purple/20 rounded-xl text-neon-cyan font-semibold text-[13px] flex items-center gap-2 shadow-[0_0_15px_rgba(176,38,255,0.1)]">
          <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
          Assignment Score: {candidate.score_overrides.assignment_score} (from rubric)
        </div>
      )}
    </div>
  );
}

function VideoTab({ candidate, dispatch }: { candidate: Candidate, dispatch: React.Dispatch<Action> }) {
  const criteria = [
    { key: 'clarity', label: 'Clarity', desc: 'Is the explanation easy to follow?' },
    { key: 'confidence', label: 'Confidence', desc: 'Does the candidate seem comfortable and assured?' },
    { key: 'architecture_explanation', label: 'Architecture Explanation', desc: 'Can they describe system design and rationale?' },
    { key: 'tradeoff_reasoning', label: 'Tradeoff Reasoning', desc: 'Do they discuss alternatives and justify choices?' },
    { key: 'communication', label: 'Communication', desc: 'Grammar, pacing, tone' },
  ] as const;

  const rubric = candidate.video_rubric || { clarity: 0, confidence: 0, architecture_explanation: 0, tradeoff_reasoning: 0, communication: 0 };
  const [ts, setTs] = React.useState('');
  const [note, setNote] = React.useState('');

  const handleAddNote = () => {
    if (!ts || !note) return;
    dispatch({ type: 'ADD_VIDEO_NOTE', id: candidate.id, note: { id: crypto.randomUUID(), timestamp: ts, note } });
    setTs(''); setNote('');
  };
  const tsValid = /^\d{2}:\d{2}$/.test(ts);

  return (
    <div className="pb-8">
      <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/30 mb-4 flex items-center gap-2">
        <div className="w-1 h-4 bg-gradient-to-b from-violet-400 to-purple-400 rounded-full" /> Video Evaluation
      </h3>
      <div className="flex flex-col gap-3 mb-8">
        {criteria.map(c => (
          <RubricSliderRow key={c.key} label={c.label} description={c.desc} value={rubric[c.key]} onChange={(val) => dispatch({ type: 'UPDATE_VIDEO_RUBRIC', id: candidate.id, field: c.key, value: val })} />
        ))}
      </div>

      <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/30 mb-4 flex items-center gap-2">
        <div className="w-1 h-4 bg-gradient-to-b from-amber-400 to-orange-400 rounded-full" /> Timestamp Notes
      </h3>
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 mb-4">
        <div className="flex gap-2 mb-2">
          <Input placeholder="mm:ss" value={ts} onChange={e => setTs(e.target.value)} className="w-[80px] font-mono text-center" maxLength={5} />
          <Input placeholder="Add a note..." value={note} onChange={e => setNote(e.target.value)} className="flex-1" maxLength={120} />
          <Button variant="primary" size="compact" onClick={handleAddNote} disabled={!tsValid || note.trim().length === 0}>Add</Button>
        </div>
        {ts.length > 0 && !tsValid && (
          <div className="text-[12px] text-red-400 mt-1 flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full" /> Use mm:ss format
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {candidate.video_notes.map(n => (
          <div key={n.id} className="flex gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl group items-start hover:bg-white/[0.05] transition-all duration-200">
            <span className="font-mono font-semibold text-neon-cyan bg-neon-cyan/10 px-2 py-1 rounded-lg text-[12px] shrink-0">{n.timestamp}</span>
            <span className="text-[13px] text-white/70 flex-1 leading-relaxed">{n.note}</span>
            <button className="text-white/15 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200 p-1 hover:bg-red-500/10 rounded-lg" onClick={() => dispatch({ type: 'DELETE_VIDEO_NOTE', id: candidate.id, noteId: n.id })}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {candidate.video_notes.length === 0 && (
          <div className="text-[13px] text-white/20 italic text-center py-6 bg-white/[0.02] rounded-xl border border-white/[0.04]">No timestamp notes added yet.</div>
        )}
      </div>
    </div>
  );
}
