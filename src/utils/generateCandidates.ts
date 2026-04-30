import type { Candidate, ReviewStatus } from "../types/candidate";
import { calculatePriority } from "./priorityEngine";

const firstNames = ["James", "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Sophia", "Lucas", "Isabella", "Mason", "Mia", "Ethan", "Amelia", "Michael", "Harper", "Alexander", "Evelyn", "Daniel", "Abigail"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
const colleges = ["MIT", "Stanford", "Harvard", "UC Berkeley", "CMU", "Georgia Tech", "Caltech", "UIUC", "Cornell", "Michigan", "UT Austin", "Washington", "Purdue", "Wisconsin"];

const generateRandomScore = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export function generateCandidates(count: number): Candidate[] {
  return Array.from({ length: count }).map((_, index) => {
    const id = `cand-${Math.random().toString(36).substr(2, 9)}-${index}`;
    const name = `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`;
    const college = getRandomElement(colleges);
    
    // Generate realistic distribution (mostly 60-85, some highs, some lows)
    const baseScoreProfile = Math.random();
    let minScore = 40;
    let maxScore = 95;
    
    if (baseScoreProfile > 0.8) {
      // High performers (20%)
      minScore = 75;
      maxScore = 95;
    } else if (baseScoreProfile > 0.3) {
      // Average performers (50%)
      minScore = 55;
      maxScore = 80;
    } else {
      // Lower performers (30%)
      minScore = 40;
      maxScore = 65;
    }

    const scores = {
      assignment_score: generateRandomScore(minScore, maxScore),
      video_score: generateRandomScore(minScore, maxScore),
      ats_score: generateRandomScore(minScore, maxScore),
      github_score: generateRandomScore(minScore, maxScore),
      communication_score: generateRandomScore(minScore, maxScore),
    };

    const { score, priority } = calculatePriority(scores);

    // Random status
    // Bias towards pending
    const statusRand = Math.random();
    const review_status: ReviewStatus = statusRand > 0.4 ? "pending" : (statusRand > 0.1 ? "reviewed" : "shortlisted");

    return {
      id,
      name,
      college,
      scores,
      overall_score: score,
      priority,
      review_status
    };
  });
}
