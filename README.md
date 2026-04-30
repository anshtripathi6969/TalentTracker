<div align="center">

# 🎯 Talent Tracker

### The AI-Powered Hiring Command Center

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0050?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com)

**Evaluate, compare, and shortlist top candidates with a powerful visual hiring dashboard designed for modern teams.**

<br />
<img width="1909" height="1070" alt="image" src="https://github.com/user-attachments/assets/8a0e1a35-bf3a-449e-812d-c3f5013935c9" />
<img width="1919" height="1068" alt="image" src="https://github.com/user-attachments/assets/1b02edfd-58ec-497e-bf9a-e6658000610c" />


[🚀 Live Demo](#-getting-started) · [📖 Features](#-features) · [🏗️ Architecture](#%EF%B8%8F-architecture) · [⚡ Quick Start](#-getting-started)

---

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#%EF%B8%8F-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Design System](#-design-system)
- [Priority Engine](#-priority-engine)
- [Key Components](#-key-components)
- [Performance](#-performance)
- [Author](#-author)

---

## 🌟 Overview

**Talent Tracker** is a production-grade internal hiring dashboard that empowers recruiting teams to evaluate 100+ candidates efficiently through intelligent scoring, real-time filtering, and visual comparison tools — all wrapped in a stunning dark neon aesthetic.

The application consists of two main experiences:

| Page | Description |
|------|-------------|
| **Landing Page** | A premium marketing page with GSAP scroll animations, smooth Lenis scrolling, glassmorphism effects, and an embedded video demo |
| **Dashboard** | A fully interactive candidate management system with filtering, scoring, comparison mode, and detailed evaluation drawers |

---

## ✨ Features

### 🎨 Landing Page
- **Cinematic Hero Section** — Animated grid background with neon glow orbs and gradient typography
- **Smooth Scroll** — Lenis-powered buttery smooth scrolling with GSAP ScrollTrigger animations
- **Interactive Timeline** — "How It Works" section with scroll-activated step animations
- **Live Video Demo** — Auto-playing muted preview with fullscreen modal player
- **Glassmorphic UI** — Frosted glass cards, gradient borders, and backdrop blur effects
- **Responsive Design** — Fully responsive from mobile to 4K displays

### 📊 Dashboard
- **Smart Candidate Table** — Sortable columns, pagination (25 per page), sticky headers
- **Priority Engine** — Weighted scoring algorithm (Assignment 30%, Video 25%, ATS 20%, GitHub 15%, Communication 10%)
- **Real-time Filtering** — Multi-range sliders, priority/status checkboxes, instant search
- **Score Override** — Inline-editable scores that recalculate priority in real-time
- **Candidate Drawer** — Detailed evaluation panel with tabs (Overview, Assignment, Video)
- **Rubric Evaluation** — Star ratings + sliders for Assignment and Video assessments
- **Timestamp Notes** — Add video review notes with mm:ss timestamps
- **Comparison Mode** — Select up to 3 candidates for side-by-side comparison with "Top Pick" highlighting
- **Status Management** — Shortlist, reject, or reset candidates with one click
- **Shortlist-Only Toggle** — Quick filter to view only shortlisted candidates

---

## 🛠 Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | React 19 | UI components & state management |
| **Language** | TypeScript 6.0 | Type safety & developer experience |
| **Build Tool** | Vite 8 | Lightning-fast HMR & optimized builds |
| **Styling** | Tailwind CSS 3.4 | Utility-first styling with custom theme |
| **Animations** | GSAP 3.15 + ScrollTrigger | Scroll-driven animations on landing page |
| **Motion** | Framer Motion 12 | Component transitions & micro-interactions |
| **Smooth Scroll** | Lenis 1.3 | Buttery smooth page scrolling |
| **UI Primitives** | Radix UI | Accessible sliders, tooltips, dialogs |
| **Icons** | Lucide React | Consistent icon system |
| **Routing** | React Router 7 | Client-side navigation |
| **Utilities** | clsx + tailwind-merge | Conditional class name composition |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│                   App.tsx                    │
│         (Router + Lenis Provider)            │
├──────────────────┬──────────────────────────┤
│   Landing Page   │       Dashboard          │
│   (Marketing)    │    (Application)         │
├──────────────────┼──────────────────────────┤
│  • Hero          │  • TopBar                │
│  • Features      │  • SummaryPanel (KPIs)   │
│  • HowItWorks    │  • FilterSidebar         │
│  • DemoShowcase  │  • CandidateTable        │
│  • Benefits      │  • CandidateDrawer       │
│  • FinalCTA      │  • ComparisonMode        │
│  • Footer        │                          │
├──────────────────┴──────────────────────────┤
│              Shared Layer                    │
│  • Tailwind Config (Design Tokens)          │
│  • Type Definitions                         │
│  • Priority Engine (Scoring Algorithm)      │
│  • useReducer Store (State Management)      │
└─────────────────────────────────────────────┘
```

### State Management

The dashboard uses React's `useReducer` with a centralized store pattern:

```typescript
// 15+ action types including:
SET_SORT           // Column sorting
SET_FILTERS        // Multi-range filtering
UPDATE_SCORE_OVERRIDE  // Inline score editing → auto priority recalc
UPDATE_CANDIDATE_STATUS  // Shortlist/Reject/Pending
UPDATE_ASSIGNMENT_RUBRIC // Rubric → auto assignment score
ADD_VIDEO_NOTE     // Timestamped video notes
TOGGLE_COMPARISON  // Side-by-side mode
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/anshtripathi6969/TalentTracker.git

# Navigate to project
cd TalentTracker

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be running at **http://localhost:5173**

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |

---

## 📁 Project Structure

```
src/
├── App.tsx                          # Root component with routing + Lenis
├── main.tsx                         # React entry point
├── index.css                        # Global styles, Tailwind directives
│
├── components/                      # Landing page components
│   ├── ui/
│   │   ├── Button.tsx               # Reusable button with variants
│   │   └── Navbar.tsx               # Sticky navigation with scroll effects
│   └── sections/
│       ├── Hero.tsx                  # Animated hero with grid background
│       ├── Features.tsx              # Feature cards grid
│       ├── HowItWorks.tsx            # Timeline with GSAP scroll animations
│       ├── DemoShowcase.tsx          # Video preview + fullscreen modal
│       ├── Benefits.tsx              # Benefits section
│       ├── InteractivePreview.tsx    # Dashboard preview mockup
│       ├── FinalCTA.tsx              # Call-to-action section
│       └── Footer.tsx               # Footer with social links
│
├── pages/
│   ├── LandingPage.tsx              # Landing page composition
│   └── dashboard/
│       ├── DashboardApp.tsx          # Dashboard root layout
│       ├── store.ts                 # useReducer state management (15+ actions)
│       ├── types.ts                 # TypeScript interfaces
│       ├── data.ts                  # 100 procedurally generated candidates
│       ├── utils.ts                 # Priority engine & scoring helpers
│       └── components/
│           ├── HeaderComponents.tsx  # TopBar + KPI summary cards
│           ├── FilterSidebar.tsx     # Multi-range filter panel
│           ├── CandidateTable.tsx    # Sortable, paginated data table
│           ├── CandidateDrawer.tsx   # Detail panel with tabs
│           ├── ComparisonMode.tsx    # Side-by-side comparison
│           └── ui/                  # Dashboard-specific UI primitives
│               ├── Badge.tsx         # Priority & status badges
│               ├── Button.tsx        # Dashboard buttons
│               ├── Input.tsx         # Styled input fields
│               └── ScoreBar.tsx      # Gradient score progress bars
│
├── utils/
│   ├── generateCandidates.ts        # Candidate data generator
│   └── priorityEngine.ts           # Weighted scoring algorithm
│
└── types/
    └── candidate.ts                 # Shared type definitions
```

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `dark-900` | `#0a0a0a` | Primary background |
| `dark-800` | `#141414` | Card backgrounds |
| `neon-purple` | `#b026ff` | Primary accent |
| `neon-blue` | `#0064ff` | Secondary accent |
| `neon-cyan` | `#00f0ff` | Tertiary accent / highlights |

### Typography

| Font | Weight | Usage |
|------|--------|-------|
| **Outfit** | 400–800 | Headings, hero text |
| **Work Sans** | 300–700 | Dashboard body text |
| **Inter** | 400–600 | Fallback UI text |
| **Space Mono** | 400–700 | Scores, data, mono values |

### Design Principles

- **Glassmorphism** — `backdrop-blur-xl` + `bg-white/5` + `border-white/10`
- **Neon Glows** — `box-shadow` with purple/cyan tints on interactive elements
- **Micro-animations** — Hover lifts, icon scales, gradient transitions
- **Dark-first** — Designed exclusively for dark mode for maximum visual impact

---

## 🧮 Priority Engine

Candidates are scored using a **weighted composite algorithm**:

```
Priority Score = (Assignment × 0.30) + (Video × 0.25) + (ATS × 0.20)
               + (GitHub × 0.15) + (Communication × 0.10)
```

### Priority Labels

| Label | Score Range | Meaning | Color |
|-------|-----------|---------|-------|
| **P0** | ≥ 80 | Interview Immediately | 🟢 Green |
| **P1** | 65 – 79 | Strong Candidate | 🔵 Blue |
| **P2** | 50 – 64 | Needs Review | 🟡 Amber |
| **P3** | < 50 | Low Priority | 🔴 Red |

### Score Overrides

Any score can be overridden inline. When overridden:
1. The priority score recalculates immediately
2. The priority label updates in real-time
3. Assignment rubric evaluations automatically compute the assignment score

---

## 🧩 Key Components

### `CandidateTable`
- Sortable by any column (click header to toggle asc/desc)
- Paginated with 25 candidates per page
- Sticky header for scroll context
- Row hover with neon selection highlight
- Inline shortlist (⭐) and compare (☐) actions

### `FilterSidebar`
- **Search** — Filter by name or college
- **Range Sliders** — Radix UI dual-thumb sliders for each score dimension
- **Checkboxes** — Priority (P0–P3) and Status (Pending/Reviewed/Shortlisted/Rejected)
- **Active Filters Badge** — Shows count of applied filters
- **Reset All** — One-click filter reset

### `CandidateDrawer`
- **Overview Tab** — All 5 scores with inline edit, priority score with weight breakdown, reviewer notes
- **Assignment Tab** — 6-criteria rubric (UI Quality, Component Structure, State Handling, Edge Cases, Responsiveness, Accessibility) with star ratings + sliders
- **Video Tab** — 5-criteria rubric (Clarity, Confidence, Architecture, Tradeoffs, Communication) + timestamped notes system

### `ComparisonMode`
- Select up to 3 candidates via checkbox
- Floating comparison bar with selected candidates
- Full-screen comparison modal with score-by-score breakdown
- "Top Pick" badge on highest-scoring candidate
- Direct shortlist action from comparison view

---

## ⚡ Performance

| Metric | Value |
|--------|-------|
| **Build Time** | ~2.5s |
| **Bundle Size (JS)** | 631 KB (201 KB gzipped) |
| **Bundle Size (CSS)** | 59 KB (9.5 KB gzipped) |
| **First Contentful Paint** | < 1s |
| **Candidate Dataset** | 100 procedurally generated |
| **Filter Response** | Instant (derived state) |

### Optimizations Applied
- Lenis smooth scroll conditionally disabled on dashboard route (prevents wheel event interception)
- Scroll containers use proper `overflow-auto` with `min-h-0` flex containment
- GSAP animations use `ScrollTrigger` with automatic cleanup (`ctx.revert()`)
- Custom scrollbar styling via CSS (no plugin dependency)
- Staggered animations prevent layout thrashing

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` directory, ready to deploy to any static hosting:

- **Vercel** — `vercel --prod`
- **Netlify** — Drag & drop the `dist` folder
- **GitHub Pages** — Use `gh-pages` package

---

## 👨‍💻 Author

<div align="center">

**Built with ❤️ by Ansh Tripathi**

[![GitHub](https://img.shields.io/badge/GitHub-anshtripathi6969-181717?style=for-the-badge&logo=github)](https://github.com/anshtripathi6969)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-anshtripathi20-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/anshtripathi20/)
[![Email](https://img.shields.io/badge/Email-anshamigo007-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:anshamigo007@gmail.com)

</div>

---

<div align="center">
  <sub>© 2026 Talent Tracker. All rights reserved.</sub>
</div>
