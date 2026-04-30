import type { Candidate } from './types';

export function computePriorityScore(candidate: Candidate): number {
  const assignment = candidate.score_overrides?.assignment_score 
    ?? candidate.assignment_score;
  const video = candidate.score_overrides?.video_score 
    ?? candidate.video_score;
  const ats = candidate.score_overrides?.ats_score 
    ?? candidate.ats_score;
  const github = candidate.score_overrides?.github_score 
    ?? candidate.github_score;
  const communication = candidate.score_overrides?.communication_score 
    ?? candidate.communication_score;

  return (
    assignment    * 0.30 +
    video         * 0.25 +
    ats           * 0.20 +
    github        * 0.15 +
    communication * 0.10
  );
}

export function computePriorityLabel(score: number): 'P0' | 'P1' | 'P2' | 'P3' {
  if (score >= 80) return 'P0';
  if (score >= 65) return 'P1';
  if (score >= 50) return 'P2';
  return 'P3';
}

export function computeAssignmentScoreFromRubric(rubric: NonNullable<Candidate['assignment_rubric']>): number {
  const total = Object.values(rubric).reduce((a, b) => a + b, 0);
  return Math.round((total / 30) * 100);
}

export function computeVideoScoreFromRubric(rubric: NonNullable<Candidate['video_rubric']>): number {
  const total = Object.values(rubric).reduce((a, b) => a + b, 0);
  return Math.round((total / 25) * 100);
}
