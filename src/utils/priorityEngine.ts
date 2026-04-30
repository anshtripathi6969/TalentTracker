import type { CandidateScores, Priority } from "../types/candidate";

/**
 * Calculates priority based on the weighted formula:
 * 30% Assignment
 * 25% Video
 * 20% ATS
 * 15% GitHub
 * 10% Communication
 */
export function calculatePriority(scores: CandidateScores): { score: number; priority: Priority } {
  // Validate scores to prevent invalid updates
  const safeScore = (val: number) => {
    if (typeof val !== 'number' || isNaN(val)) return 0;
    return Math.max(0, Math.min(100, val));
  };

  const weightedScore = 
    safeScore(scores.assignment_score) * 0.30 +
    safeScore(scores.video_score) * 0.25 +
    safeScore(scores.ats_score) * 0.20 +
    safeScore(scores.github_score) * 0.15 +
    safeScore(scores.communication_score) * 0.10;

  const score = Math.round(weightedScore);

  let priority: Priority;
  if (score >= 80) {
    priority = "P0";
  } else if (score >= 70) {
    priority = "P1";
  } else if (score >= 55) {
    priority = "P2";
  } else {
    priority = "P3";
  }

  return { score, priority };
}
