import type { Candidate } from './types';

const colleges = [
  "IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Kanpur", "IIT Kharagpur",
  "BITS Pilani", "BITS Goa", "NIT Trichy", "NIT Warangal", "NIT Surathkal",
  "VIT Vellore", "Manipal Institute of Technology", "SRM University",
  "Pune Institute of Computer Technology", "IIIT Hyderabad",
  "Delhi Technological University", "VJTI Mumbai", "PSG College of Technology",
  "Amrita Vishwa Vidyapeetham", "Thapar Institute of Engineering",
  "University of Toronto", "NUS Singapore", "TU Munich"
];

const firstNames = ["Rahul", "Priya", "Amit", "Sneha", "Karan", "Anjali", "Vikram", "Riya", "Arjun", "Neha"];
const lastNames = ["Sharma", "Singh", "Patel", "Kumar", "Gupta", "Reddy", "Iyer", "Nair", "Das", "Joshi"];

function generateName() {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first} ${last}`;
}

function randomScore(min = 40, max = 95) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate() {
  const start = new Date(2026, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

function generateCandidate(id: number): Candidate {
  return {
    id,
    name: generateName(),
    college: colleges[Math.floor(Math.random() * colleges.length)],
    email: `candidate${id}@example.com`,
    ats_score: randomScore(45, 92),
    assignment_score: randomScore(40, 95),
    video_score: randomScore(40, 90),
    github_score: randomScore(35, 88),
    communication_score: randomScore(42, 90),
    priority_score: 0,
    priority_label: 'P3',
    status: 'pending',
    reviewer_notes: '',
    score_overrides: {},
    assignment_rubric: null,
    video_rubric: null,
    video_notes: [],
    applied_at: randomDate(),
    is_in_comparison: false,
  };
}

export const initialCandidates: Candidate[] = Array.from({ length: 100 }, (_, i) => generateCandidate(i + 1));

// Override the first 5 candidates with predefined profiles
initialCandidates[0] = { ...initialCandidates[0], name: "Aditya Sharma", assignment_score: 92, video_score: 88, ats_score: 85, github_score: 80, communication_score: 82 };
initialCandidates[1] = { ...initialCandidates[1], name: "Priya Menon", assignment_score: 78, video_score: 72, ats_score: 90, github_score: 65, communication_score: 74 };
initialCandidates[2] = { ...initialCandidates[2], name: "Rahul Gupta", assignment_score: 62, video_score: 58, ats_score: 70, github_score: 55, communication_score: 60 };
initialCandidates[3] = { ...initialCandidates[3], name: "Sneha Iyer", assignment_score: 55, video_score: 50, ats_score: 60, github_score: 48, communication_score: 52 };
initialCandidates[4] = { ...initialCandidates[4], name: "Vikram Reddy", assignment_score: 38, video_score: 42, ats_score: 45, github_score: 30, communication_score: 38 };
