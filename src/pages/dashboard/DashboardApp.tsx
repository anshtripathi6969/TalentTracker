import { useReducer } from 'react';
import { appReducer, initialState } from './store';
import { TopBar, SummaryPanel } from './components/HeaderComponents';
import { FilterSidebar } from './components/FilterSidebar';
import { CandidateTable } from './components/CandidateTable';
import { CandidateDrawer } from './components/CandidateDrawer';
import { ComparisonBar, ComparisonModal } from './components/ComparisonMode';

function DashboardApp() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Derived state: Filtering
  let filtered = state.candidates.filter(c => {
    if (state.shortlist_only && c.status !== 'shortlisted') return false;
    const search = state.filters.search.toLowerCase();
    if (search && !c.name.toLowerCase().includes(search) && !c.college.toLowerCase().includes(search)) return false;
    const a = c.score_overrides.assignment_score ?? c.assignment_score;
    if (a < state.filters.assignment_range[0] || a > state.filters.assignment_range[1]) return false;
    const v = c.score_overrides.video_score ?? c.video_score;
    if (v < state.filters.video_range[0] || v > state.filters.video_range[1]) return false;
    const ats = c.score_overrides.ats_score ?? c.ats_score;
    if (ats < state.filters.ats_range[0] || ats > state.filters.ats_range[1]) return false;
    const g = c.score_overrides.github_score ?? c.github_score;
    if (g < state.filters.github_range[0] || g > state.filters.github_range[1]) return false;
    const comm = c.score_overrides.communication_score ?? c.communication_score;
    if (comm < state.filters.communication_range[0] || comm > state.filters.communication_range[1]) return false;
    if (!state.filters.priority.includes(c.priority_label)) return false;
    if (!state.filters.status.includes(c.status)) return false;
    return true;
  });

  // Derived state: Sorting
  filtered.sort((a, b) => {
    let valA: any = a[state.sort_by];
    let valB: any = b[state.sort_by];
    if (state.sort_by === 'assignment_score') { valA = a.score_overrides.assignment_score ?? a.assignment_score; valB = b.score_overrides.assignment_score ?? b.assignment_score; }
    else if (state.sort_by === 'video_score') { valA = a.score_overrides.video_score ?? a.video_score; valB = b.score_overrides.video_score ?? b.video_score; }
    else if (state.sort_by === 'ats_score') { valA = a.score_overrides.ats_score ?? a.ats_score; valB = b.score_overrides.ats_score ?? b.ats_score; }
    else if (state.sort_by === 'github_score') { valA = a.score_overrides.github_score ?? a.github_score; valB = b.score_overrides.github_score ?? b.github_score; }
    else if (state.sort_by === 'communication_score') { valA = a.score_overrides.communication_score ?? a.communication_score; valB = b.score_overrides.communication_score ?? b.communication_score; }
    if (valA < valB) return state.sort_direction === 'asc' ? -1 : 1;
    if (valA > valB) return state.sort_direction === 'asc' ? 1 : -1;
    return a.name.localeCompare(b.name);
  });

  const activeCandidate = state.candidates.find(c => c.id === state.active_candidate_id) || null;

  return (
    <div
      className="h-screen w-screen flex flex-col overflow-hidden antialiased"
      style={{
        fontFamily: "'Work Sans', 'Inter', system-ui, sans-serif",
        fontSize: '13px',
        background: `
          radial-gradient(ellipse 600px 400px at 25% 10%, rgba(176,38,255,0.04), transparent),
          radial-gradient(ellipse 500px 300px at 75% 90%, rgba(0,100,255,0.03), transparent),
          radial-gradient(ellipse 800px 600px at 50% 50%, rgba(0,240,255,0.02), transparent),
          linear-gradient(135deg, #0a0b14 0%, #0d0f1a 30%, #0f1018 60%, #0a0b14 100%)
        `,
        color: '#e2e8f0',
      }}
    >
      <style>{`
        .dash-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
        .dash-scroll::-webkit-scrollbar-track { background: transparent; }
        .dash-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
        .dash-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
      `}</style>

      <TopBar
        shortlist_only={state.shortlist_only}
        toggleShortlist={() => dispatch({ type: 'TOGGLE_SHORTLIST_ONLY' })}
      />

      <SummaryPanel candidates={state.candidates} />

      <div className="flex flex-1 min-h-0">
        <FilterSidebar filters={state.filters} dispatch={dispatch} candidates={state.candidates} />
        <main className="flex-1 flex flex-col min-w-0 min-h-0">
          <CandidateTable candidates={filtered} state={state} dispatch={dispatch} />
        </main>
      </div>

      <CandidateDrawer candidate={activeCandidate} state={state} dispatch={dispatch} />
      <ComparisonBar state={state} dispatch={dispatch} />
      <ComparisonModal state={state} dispatch={dispatch} />
    </div>
  );
}

export default DashboardApp;
