import { PORTFOLIO_CONFIG } from '../config/portfolio';

export interface GitHubReadmeData {
  rawMarkdown: string;
  repoName: string;
  repoUrl: string;
  sha?: string;
  fetchedAt: string;
  isLive: boolean;
  title: string;
  introText: string;
  overviewText: string;
  highlights: string[];
  techStack: string[];
  sections: {
    heading: string;
    level: number;
    content: string;
  }[];
}

const README_CACHE_KEY = 'abdulfetah_portfolio_readme_v1';
const README_CACHE_TTL = 15 * 60 * 1000; // 15 mins

export const FALLBACK_README_MARKDOWN = `# Abdulfetah Bedru Portfolio

A modern personal portfolio website built with React, TypeScript, and Vite. It showcases professional experience, technical skills, selected projects, engineering thinking, learning journey, resume access, and contact information in a polished single-page experience.

## Overview

This portfolio is designed to present Abdulfetah Bedru as a full-stack software engineer with a strong focus on modern web application development, scalable systems, and high-quality product engineering.

The site includes:
- Hero and introduction section
- About and profile summary
- Technical skills breakdown
- Highlighted projects and case studies
- Engineering approach and architecture overview
- Learning journey and training highlights
- GitHub and resume sections
- Contact details and CTA actions
- Light/dark theme support
- Offline status indicator

## Tech Stack

- React 19
- TypeScript
- Vite
- HTML/CSS with utility-first styling patterns
- Recharts
- Lucide React
- Google GenAI integration for AI-powered assistant experience

## Project Structure

\`\`\`text
.
├── App.tsx
├── components/
├── context/
├── config/
├── public/
├── scripts/
├── services/
├── constants.ts
├── index.html
├── index.tsx
├── metadata.json
├── package.json
├── tsconfig.json
├── types.ts
├── vite.config.ts
└── bun.lock
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Install dependencies

\`\`\`bash
npm install
\`\`\`

### Run locally

\`\`\`bash
npm run dev
\`\`\`

Then open the local Vite URL shown in the terminal.

### Production build

\`\`\`bash
npm run build
\`\`\`

### Preview production build

\`\`\`bash
npm run preview
\`\`\`

## Scripts

- \`npm run dev\` — start the development server
- \`npm run build\` — build the app for production
- \`npm run preview\` — preview the production build
- \`npm run lint\` — run TypeScript checks

## Notes

This project is a personal portfolio and may be customized further based on your profile, projects, resume, and preferred deployment target.

## License

This repository does not currently include a license file. If you plan to publish or share it publicly, consider adding an appropriate open-source license.
`;

export function parseReadmeSections(markdown: string): {
  title: string;
  introText: string;
  overviewText: string;
  highlights: string[];
  techStack: string[];
  sections: { heading: string; level: number; content: string }[];
} {
  const lines = markdown.split('\n');
  let title = 'Abdulfetah Bedru Portfolio';
  let introText = '';
  let overviewText = '';
  const highlights: string[] = [];
  const techStack: string[] = [];
  const sections: { heading: string; level: number; content: string }[] = [];

  let currentHeading = '';
  let currentLevel = 0;
  let currentContent: string[] = [];

  let inIntro = true;
  let inOverview = false;
  let inHighlights = false;
  let inTechStack = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('# ')) {
      title = line.replace('# ', '').trim();
      inIntro = true;
      continue;
    }

    if (line.startsWith('## ') || line.startsWith('### ')) {
      if (currentHeading) {
        sections.push({
          heading: currentHeading,
          level: currentLevel,
          content: currentContent.join('\n').trim(),
        });
      }

      currentLevel = line.startsWith('## ') ? 2 : 3;
      currentHeading = line.replace(/^#{2,3}\s+/, '').trim();
      currentContent = [];
      inIntro = false;

      if (currentHeading.toLowerCase().includes('overview')) {
        inOverview = true;
        inTechStack = false;
      } else if (currentHeading.toLowerCase().includes('tech stack')) {
        inTechStack = true;
        inOverview = false;
      } else {
        inOverview = false;
        inTechStack = false;
      }
      continue;
    }

    if (inIntro && line.trim() && !line.startsWith('#')) {
      introText += (introText ? ' ' : '') + line.trim();
    }

    if (inOverview) {
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        highlights.push(line.trim().replace(/^[-*]\s+/, ''));
      } else if (line.trim()) {
        overviewText += (overviewText ? ' ' : '') + line.trim();
      }
    }

    if (inTechStack && (line.trim().startsWith('- ') || line.trim().startsWith('* '))) {
      techStack.push(line.trim().replace(/^[-*]\s+/, ''));
    }

    currentContent.push(line);
  }

  if (currentHeading) {
    sections.push({
      heading: currentHeading,
      level: currentLevel,
      content: currentContent.join('\n').trim(),
    });
  }

  return {
    title,
    introText,
    overviewText: overviewText || "This portfolio is designed to present Abdulfetah Bedru as a full-stack software engineer with a strong focus on modern web application development, scalable systems, and high-quality product engineering.",
    highlights,
    techStack,
    sections,
  };
}

export async function fetchPortfolioReadme(forceRefresh: boolean = false): Promise<GitHubReadmeData> {
  const username = PORTFOLIO_CONFIG.githubUsername;
  const repo = 'Portfolio';
  const repoUrl = `https://github.com/${username}/${repo}`;

  if (!forceRefresh) {
    try {
      const cached = localStorage.getItem(README_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < README_CACHE_TTL && parsed.data) {
          return parsed.data;
        }
      }
    } catch (e) {
      // Ignore cache errors
    }
  }

  let rawMarkdown = '';
  let sha = '';
  let isLive = false;

  try {
    // Attempt 1: Fetch via GitHub API contents
    const apiRes = await fetch(`https://api.github.com/repos/${username}/${repo}/readme`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    });

    if (apiRes.ok) {
      const data = await apiRes.json();
      sha = data.sha || '';
      if (data.content && data.encoding === 'base64') {
        // Decode base64 UTF-8 string safely
        const binaryString = atob(data.content.replace(/\s/g, ''));
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        rawMarkdown = new TextDecoder().decode(bytes);
        isLive = true;
      }
    }

    // Attempt 2: If API failed or rate-limited, fetch raw GitHub content directly
    if (!rawMarkdown) {
      const rawRes = await fetch(`https://raw.githubusercontent.com/${username}/${repo}/main/README.md`);
      if (rawRes.ok) {
        rawMarkdown = await rawRes.text();
        isLive = true;
      }
    }
  } catch (err) {
    console.warn("Could not fetch remote README from GitHub, falling back to local portfolio specification:", err);
  }

  if (!rawMarkdown) {
    rawMarkdown = FALLBACK_README_MARKDOWN;
  }

  const parsed = parseReadmeSections(rawMarkdown);

  const result: GitHubReadmeData = {
    rawMarkdown,
    repoName: `${username}/${repo}`,
    repoUrl,
    sha,
    fetchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isLive,
    title: parsed.title,
    introText: parsed.introText,
    overviewText: parsed.overviewText,
    highlights: parsed.highlights,
    techStack: parsed.techStack,
    sections: parsed.sections,
  };

  try {
    localStorage.setItem(
      README_CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        data: result,
      })
    );
  } catch (e) {
    // Ignore storage issues
  }

  return result;
}
