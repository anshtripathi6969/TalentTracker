export type Priority = "P0" | "P1" | "P2" | "P3";
export type ReviewStatus = "pending" | "reviewed" | "shortlisted";

export interface CandidateScores {
  assignment_score: number;
  video_score: number;
  ats_score: number;
  github_score: number;
  communication_score: number;
}

export interface Candidate {
  id: string;
  name: string;
  college: string;
  scores: CandidateScores;
  overall_score: number;
  priority: Priority;
  review_status: ReviewStatus;
}

export interface Filters {
  status: ReviewStatus | "all";
  priority: Priority | "all";
  searchQuery: string;
}

export type SortOption = "score_desc" | "score_asc" | "name_asc" | "name_desc";
