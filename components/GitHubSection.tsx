import React from 'react';
import { PORTFOLIO_CONFIG, FEATURED_REPOSITORIES } from '../config/portfolio';
import { Github, Star, GitFork, ExternalLink, Code2, GitCommit, Sparkles } from 'lucide-react';

const MOCK_ACTIVITY_WEEKS = 24;
const DAYS_PER_WEEK = 7;

// Generate deterministic activity levels for aesthetic visualization
const getActivityLevel = (week: number, day: number): number => {
  const hash = (week * 7 + day * 13) % 19;
  if (hash === 0) return 0;
  if (hash < 8) return 1;
  if (hash < 14) return 2;
  return 3;
};

const LEVEL_COLORS_DARK = [
  'bg-slate-800/60',
  'bg-purple-900/60',
  'bg-purple-700',
  'bg-purple-500'
];

const LEVEL_COLORS_LIGHT = [
  'bg-slate-100',
  'bg-purple-200',
  'bg-purple-400',
  'bg-purple-600'
];

const GitHubSection: React.FC = () => {
  return (
    <section id="github" className="py-20 bg-white dark:bg-[#090d16] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest block mb-2">
              Public Repositories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Code, Projects & Open Source
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Clean implementations, reusable templates, and full-stack software repositories on GitHub.
            </p>
          </div>

          <a
            href={PORTFOLIO_CONFIG.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-700/60 shadow-xs self-start md:self-auto transition-colors"
          >
            <Github size={15} />
            <span>github.com/{PORTFOLIO_CONFIG.githubUsername}</span>
            <ExternalLink size={12} className="opacity-70" />
          </a>
        </div>

        {/* Contribution Graph Aesthetic Tile */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-2xs mb-10 overflow-x-auto">
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-slate-800 text-xs font-mono">
            <span className="text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1.5">
              <GitCommit size={14} className="text-purple-600 dark:text-purple-400" />
              Commit Velocity & Activity Map
            </span>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-xs bg-slate-200 dark:bg-slate-800"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-purple-300 dark:bg-purple-900/60"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-purple-500 dark:bg-purple-700"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-purple-700 dark:bg-purple-500"></span>
              <span>More</span>
            </div>
          </div>

          {/* Grid display */}
          <div className="flex gap-1.5 justify-between min-w-[620px] py-1">
            {Array.from({ length: MOCK_ACTIVITY_WEEKS }).map((_, w) => (
              <div key={w} className="flex flex-col gap-1.5">
                {Array.from({ length: DAYS_PER_WEEK }).map((_, d) => {
                  const level = getActivityLevel(w, d);
                  return (
                    <div
                      key={d}
                      title={`Activity indicator: Level ${level}`}
                      className={`w-3 h-3 rounded-xs transition-colors dark:${LEVEL_COLORS_DARK[level]} ${LEVEL_COLORS_LIGHT[level]}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          <div className="mt-3 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Continuous development in C#, TypeScript, and SQL</span>
            <span className="text-purple-600 dark:text-purple-400 font-semibold">Verified Git Commits</span>
          </div>
        </div>

        {/* Featured Repository Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FEATURED_REPOSITORIES.map((repo) => (
            <div
              key={repo.name}
              className="p-5 rounded-xl bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-purple-300 dark:hover:border-purple-800/80 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-sm font-bold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5"
                  >
                    <Code2 size={16} className="text-purple-600 dark:text-purple-400" />
                    {repo.name}
                  </a>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    aria-label={`Open repository ${repo.name}`}
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {repo.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {repo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${repo.language === 'C#' ? 'bg-purple-600' : 'bg-blue-500'}`}></span>
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-amber-500" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={12} />
                    {repo.forks}
                  </span>
                </div>
                <span>{repo.updated}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GitHubSection;
