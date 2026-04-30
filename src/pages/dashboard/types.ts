export interface Candidate {
  id: number;
  name: string;
  college: string;
  email: string;
  
  // Base Scores (0–100)
  ats_score: number;
  assignment_score: number;
  video_score: number;
  github_score: number;
  communication_score: number;

  // Computed (derived, not stored in seed)
  priority_score: number;
  priority_label: 'P0' | 'P1' | 'P2' | 'P3';

  // Review State
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  reviewer_notes: string;

  // Manual Score Overrides (set when reviewer edits)
  score_overrides: {
    ats_score?: number;
    assignment_score?: number;
    video_score?: number;
    github_score?: number;
    communication_score?: number;
  };

  // Assignment Rubric (reviewer-filled)
  assignment_rubric: {
    ui_quality: number;
    component_structure: number;
    state_handling: number;
    edge_case_handling: number;
    responsiveness: number;
    accessibility: number;
  } | null;

  // Video Rubric (reviewer-filled)
  video_rubric: {
    clarity: number;
    confidence: number;
    architecture_explanation: number;
    tradeoff_reasoning: number;
    communication: number;
  } | null;

  // Timestamp Notes for Video
  video_notes: Array<{
    id: string;
    timestamp: string;
    note: string;
  }>;

  // Metadata
  applied_at: string;
  is_in_comparison: boolean;
}

export interface AppState {
  candidates: Candidate[];

  // Filters
  filters: {
    search: string;
    assignment_range: [number, number];
    video_range: [number, number];
    ats_range: [number, number];
    github_range: [number, number];
    communication_range: [number, number];
    priority: Array<'P0' | 'P1' | 'P2' | 'P3'>;
    status: Array<'pending' | 'reviewed' | 'shortlisted' | 'rejected'>;
  };

  // Table
  sort_by: keyof Candidate;
  sort_direction: 'asc' | 'desc';
  page: number;
  page_size: 25;

  // Detail Drawer
  active_candidate_id: number | null;
  active_tab: 'overview' | 'assignment' | 'video';

  // Comparison
  comparison_ids: number[];
  comparison_modal_open: boolean;

  // View
  shortlist_only: boolean;
}
