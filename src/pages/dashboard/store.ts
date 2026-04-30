import type { AppState, Candidate } from './types';
import { initialCandidates } from './data';
import { computePriorityScore, computePriorityLabel, computeAssignmentScoreFromRubric, computeVideoScoreFromRubric } from './utils';

// Helper to fully recalculate priority
const recalculateCandidate = (candidate: Candidate): Candidate => {
  let finalAssignmentScore = candidate.score_overrides.assignment_score ?? candidate.assignment_score;
  let finalVideoScore = candidate.score_overrides.video_score ?? candidate.video_score;

  if (candidate.assignment_rubric) {
    const isPartiallyFilled = Object.values(candidate.assignment_rubric).some(v => v > 0);
    if (isPartiallyFilled) {
       finalAssignmentScore = computeAssignmentScoreFromRubric(candidate.assignment_rubric);
    }
  }

  if (candidate.video_rubric) {
    const isPartiallyFilled = Object.values(candidate.video_rubric).some(v => v > 0);
    if (isPartiallyFilled) {
       finalVideoScore = computeVideoScoreFromRubric(candidate.video_rubric);
    }
  }

  const scoreForPriority = {
    ...candidate,
    score_overrides: {
      ...candidate.score_overrides,
      assignment_score: candidate.score_overrides.assignment_score !== undefined ? candidate.score_overrides.assignment_score : (candidate.assignment_rubric ? finalAssignmentScore : undefined),
      video_score: candidate.score_overrides.video_score !== undefined ? candidate.score_overrides.video_score : (candidate.video_rubric ? finalVideoScore : undefined),
    }
  };

  const priority_score = computePriorityScore(scoreForPriority);
  const priority_label = computePriorityLabel(priority_score);

  return { ...candidate, priority_score, priority_label };
};

const precomputedCandidates = initialCandidates.map(recalculateCandidate);

export const initialState: AppState = {
  candidates: precomputedCandidates,
  filters: {
    search: '',
    assignment_range: [0, 100],
    video_range: [0, 100],
    ats_range: [0, 100],
    github_range: [0, 100],
    communication_range: [0, 100],
    priority: ['P0', 'P1', 'P2', 'P3'],
    status: ['pending', 'reviewed', 'shortlisted', 'rejected'],
  },
  sort_by: 'priority_score',
  sort_direction: 'desc',
  page: 1,
  page_size: 25,
  active_candidate_id: null,
  active_tab: 'overview',
  comparison_ids: [],
  comparison_modal_open: false,
  shortlist_only: false,
};

export type Action =
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_SCORE_RANGE'; filter: keyof AppState['filters']; payload: [number, number] }
  | { type: 'TOGGLE_PRIORITY_FILTER'; payload: 'P0' | 'P1' | 'P2' | 'P3' }
  | { type: 'TOGGLE_STATUS_FILTER'; payload: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_SORT'; payload: keyof Candidate }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'OPEN_DRAWER'; payload: number }
  | { type: 'CLOSE_DRAWER' }
  | { type: 'SET_ACTIVE_TAB'; payload: AppState['active_tab'] }
  | { type: 'UPDATE_CANDIDATE_STATUS'; id: number; payload: Candidate['status'] }
  | { type: 'UPDATE_REVIEWER_NOTES'; id: number; payload: string }
  | { type: 'UPDATE_SCORE_OVERRIDE'; id: number; field: keyof Candidate['score_overrides']; value: number | undefined }
  | { type: 'UPDATE_ASSIGNMENT_RUBRIC'; id: number; field: keyof NonNullable<Candidate['assignment_rubric']>; value: number }
  | { type: 'UPDATE_VIDEO_RUBRIC'; id: number; field: keyof NonNullable<Candidate['video_rubric']>; value: number }
  | { type: 'ADD_VIDEO_NOTE'; id: number; note: { id: string; timestamp: string; note: string } }
  | { type: 'DELETE_VIDEO_NOTE'; id: number; noteId: string }
  | { type: 'TOGGLE_COMPARISON'; id: number }
  | { type: 'REMOVE_FROM_COMPARISON'; id: number }
  | { type: 'SET_COMPARISON_MODAL'; payload: boolean }
  | { type: 'TOGGLE_SHORTLIST_ONLY' };

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, filters: { ...state.filters, search: action.payload }, page: 1 };
    case 'SET_SCORE_RANGE':
      return { ...state, filters: { ...state.filters, [action.filter]: action.payload }, page: 1 };
    case 'TOGGLE_PRIORITY_FILTER': {
      const { priority } = state.filters;
      const newPriority = priority.includes(action.payload)
        ? priority.filter(p => p !== action.payload)
        : [...priority, action.payload];
      return { ...state, filters: { ...state.filters, priority: newPriority }, page: 1 };
    }
    case 'TOGGLE_STATUS_FILTER': {
      const { status } = state.filters;
      const newStatus = status.includes(action.payload)
        ? status.filter(s => s !== action.payload)
        : [...status, action.payload];
      return { ...state, filters: { ...state.filters, status: newStatus }, page: 1 };
    }
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialState.filters,
        page: 1,
      };
    case 'SET_SORT':
      return {
        ...state,
        sort_by: action.payload,
        sort_direction: state.sort_by === action.payload && state.sort_direction === 'desc' ? 'asc' : 'desc',
        page: 1,
      };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'OPEN_DRAWER': {
      const candidates = state.candidates.map(c => 
        c.id === action.payload && c.status === 'pending' 
          ? { ...c, status: 'reviewed' as const } 
          : c
      );
      return { ...state, active_candidate_id: action.payload, candidates, active_tab: 'overview' };
    }
    case 'CLOSE_DRAWER':
      return { ...state, active_candidate_id: null };
    case 'SET_ACTIVE_TAB':
      return { ...state, active_tab: action.payload };
    case 'UPDATE_CANDIDATE_STATUS':
      return {
        ...state,
        candidates: state.candidates.map(c => c.id === action.id ? { ...c, status: action.payload } : c)
      };
    case 'UPDATE_REVIEWER_NOTES':
      return {
        ...state,
        candidates: state.candidates.map(c => c.id === action.id ? { ...c, reviewer_notes: action.payload } : c)
      };
    case 'UPDATE_SCORE_OVERRIDE':
      return {
        ...state,
        candidates: state.candidates.map(c => {
          if (c.id !== action.id) return c;
          const newOverrides = { ...c.score_overrides, [action.field]: action.value };
          if (action.value === undefined) delete newOverrides[action.field];
          return recalculateCandidate({ ...c, score_overrides: newOverrides });
        })
      };
    case 'UPDATE_ASSIGNMENT_RUBRIC':
      return {
        ...state,
        candidates: state.candidates.map(c => {
          if (c.id !== action.id) return c;
          const currentRubric = c.assignment_rubric || {
            ui_quality: 0, component_structure: 0, state_handling: 0, edge_case_handling: 0, responsiveness: 0, accessibility: 0
          };
          const newRubric = { ...currentRubric, [action.field]: action.value };
          return recalculateCandidate({ ...c, assignment_rubric: newRubric });
        })
      };
    case 'UPDATE_VIDEO_RUBRIC':
      return {
        ...state,
        candidates: state.candidates.map(c => {
          if (c.id !== action.id) return c;
          const currentRubric = c.video_rubric || {
            clarity: 0, confidence: 0, architecture_explanation: 0, tradeoff_reasoning: 0, communication: 0
          };
          const newRubric = { ...currentRubric, [action.field]: action.value };
          return recalculateCandidate({ ...c, video_rubric: newRubric });
        })
      };
    case 'ADD_VIDEO_NOTE':
      return {
        ...state,
        candidates: state.candidates.map(c => {
          if (c.id !== action.id) return c;
          return { ...c, video_notes: [...c.video_notes, action.note] };
        })
      };
    case 'DELETE_VIDEO_NOTE':
      return {
        ...state,
        candidates: state.candidates.map(c => {
          if (c.id !== action.id) return c;
          return { ...c, video_notes: c.video_notes.filter(n => n.id !== action.noteId) };
        })
      };
    case 'TOGGLE_COMPARISON': {
      const idx = state.comparison_ids.indexOf(action.id);
      let newIds = [...state.comparison_ids];
      if (idx > -1) {
        newIds.splice(idx, 1);
      } else {
        if (newIds.length < 3) {
          newIds.push(action.id);
        }
      }
      return { ...state, comparison_ids: newIds };
    }
    case 'REMOVE_FROM_COMPARISON':
      return { ...state, comparison_ids: state.comparison_ids.filter(id => id !== action.id) };
    case 'SET_COMPARISON_MODAL':
      return { ...state, comparison_modal_open: action.payload };
    case 'TOGGLE_SHORTLIST_ONLY':
      return { ...state, shortlist_only: !state.shortlist_only, page: 1 };
    default:
      return state;
  }
}
